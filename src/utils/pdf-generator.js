import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export class PDFGenerator {
  constructor(options = {}) {
    this.options = {
      format: "a4",
      orientation: "portrait",
      unit: "mm",
      margin: 10,
      quality: 1.0,
      ...options,
    };
  }

  async generatePDF(elementId, filename = "document.pdf", options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    const mergedOptions = { ...this.options, ...options };

    try {
      const pdf = new jsPDF({
        orientation: mergedOptions.orientation,
        unit: mergedOptions.unit,
        format: mergedOptions.format,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = mergedOptions.margin;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;

      const pageNodes = this._splitElementByPageBreak(element);

      for (let i = 0; i < pageNodes.length; i++) {
        const pageNode = pageNodes[i];

        if (i > 0) {
          pdf.addPage();
        }

        const canvas = await html2canvas(pageNode, {
          scale: mergedOptions.quality,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = Math.min(
          contentWidth / imgWidth,
          contentHeight / imgHeight
        );
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        if (scaledHeight <= contentHeight) {
          pdf.addImage(
            imgData,
            "PNG",
            margin,
            margin,
            scaledWidth,
            scaledHeight,
            undefined,
            "FAST"
          );
        } else {
          let remainingHeight = scaledHeight;
          let sourceY = 0;
          let pageCount = 0;

          while (remainingHeight > 0) {
            if (pageCount > 0) {
              pdf.addPage();
            }

            const drawHeight = Math.min(contentHeight, remainingHeight);
            const sourceHeight = drawHeight / ratio;

            pdf.addImage(
              imgData,
              "PNG",
              margin,
              margin,
              scaledWidth,
              drawHeight,
              undefined,
              "FAST",
              0,
              sourceY
            );

            remainingHeight -= contentHeight;
            sourceY += sourceHeight;
            pageCount++;
          }
        }
      }

      this._cleanupTempElements();

      if (mergedOptions.returnBlob) {
        return pdf.output("blob");
      } else {
        pdf.save(filename);
        return pdf;
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      this._cleanupTempElements();
      throw error;
    }
  }

  _splitElementByPageBreak(element) {
    const pageBreaks = element.querySelectorAll(".page-break");

    if (pageBreaks.length === 0) {
      const clone = element.cloneNode(true);
      clone.classList.add("__pdfgen-temp-page");
      this._prepareElementForRendering(clone);
      document.body.appendChild(clone);
      return [clone];
    }

    const pages = [];
    const pdfPages = element.querySelectorAll(".pdf-page");

    if (pdfPages.length > 0) {
      pdfPages.forEach((page) => {
        const clone = page.cloneNode(true);
        clone.classList.add("__pdfgen-temp-page");
        this._prepareElementForRendering(clone);
        document.body.appendChild(clone);
        pages.push(clone);
      });
    } else {
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_ELEMENT,
        null,
        false
      );

      let currentPage = document.createElement("div");
      this._prepareElementForRendering(currentPage);
      currentPage.classList.add("__pdfgen-temp-page");

      let node;
      let currentParent = currentPage;
      const nodeStack = [];

      while ((node = walker.nextNode())) {
        if (node.classList.contains("page-break")) {
          document.body.appendChild(currentPage);
          pages.push(currentPage);

          currentPage = document.createElement("div");
          this._prepareElementForRendering(currentPage);
          currentPage.classList.add("__pdfgen-temp-page");
          currentParent = currentPage;
          nodeStack.length = 0;
        } else {
          const clonedNode = node.cloneNode(false);
          currentParent.appendChild(clonedNode);

          if (node.hasChildNodes()) {
            nodeStack.push({ original: node, clone: clonedNode });
            currentParent = clonedNode;
          }
        }
      }
      if (currentPage.hasChildNodes() || pages.length === 0) {
        document.body.appendChild(currentPage);
        pages.push(currentPage);
      }
    }

    return pages;
  }

  _prepareElementForRendering(element) {
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.top = "0";
    element.style.width = "800px";
    element.style.minHeight = "1px";
    element.style.background = "#ffffff";
    element.style.padding = "20px";
    element.style.boxSizing = "border-box";
    element.style.fontSize = "14px";
    element.style.lineHeight = "1.5";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.color = "#000000";
  }

  _cleanupTempElements() {
    const tempElements = document.querySelectorAll(".__pdfgen-temp-page");
    tempElements.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }

  _copyComputedStyles(source, target) {
    if (!(source instanceof Element) || !(target instanceof Element)) return;

    const computed = window.getComputedStyle(source);
    const importantStyles = [
      "width",
      "height",
      "padding",
      "margin",
      "border",
      "font-size",
      "font-family",
      "font-weight",
      "line-height",
      "color",
      "background-color",
      "text-align",
      "display",
      "position",
    ];

    importantStyles.forEach((prop) => {
      try {
        const value = computed.getPropertyValue(prop);
        if (value) {
          target.style.setProperty(prop, value);
        }
      } catch (e) {
        console.warn(`Failed to copy style ${prop}:`, e);
      }
    });
  }

  async generateFromTemplate(
    templateData,
    templateId,
    filename = "document.pdf"
  ) {
    const renderedElement = this.renderTemplate(templateData, templateId);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return this.generatePDF(renderedElement.id, filename);
  }

  renderTemplate(data, templateId) {
    const template = document.getElementById(templateId);
    if (!template) {
      throw new Error(`Template with id "${templateId}" not found`);
    }
    const clone = template.cloneNode(true);
    clone.id = `${templateId}-rendered-${Date.now()}`;
    clone.style.display = "block";
    this.replaceDynamicFields(clone, data);
    document.body.appendChild(clone);
    return clone;
  }

  replaceDynamicFields(element, data) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      let text = textNode.textContent;

      text = text.replace(/\{\{([^}]+)\}\}/g, (match, field) => {
        const value = this.getNestedValue(data, field.trim());
        return value !== undefined ? value : match;
      });

      textNode.textContent = text;
    });

    const elementsWithData = element.querySelectorAll("[data-field]");
    elementsWithData.forEach((el) => {
      const field = el.getAttribute("data-field");
      const value = this.getNestedValue(data, field);

      if (value !== undefined) {
        if (el.tagName === "IMG") {
          el.src = value;
        } else {
          el.textContent = value;
        }
      }
    });
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  cleanup(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.id.includes("rendered")) {
      element.remove();
    }
    this._cleanupTempElements();
  }
}

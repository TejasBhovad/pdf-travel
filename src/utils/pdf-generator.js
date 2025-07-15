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

      const canvas = await html2canvas(element, {
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

      let remainingHeight = scaledHeight;
      let currentPage = 0;

      while (remainingHeight > 0) {
        if (currentPage > 0) {
          pdf.addPage();
        }

        const yPosition = currentPage * contentHeight;
        const sourceY = yPosition / ratio;

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          scaledWidth,
          Math.min(contentHeight, remainingHeight),
          undefined,
          "FAST",
          0,
          sourceY
        );

        remainingHeight -= contentHeight;
        currentPage++;
      }

      // Save or return the PDF
      if (mergedOptions.returnBlob) {
        return pdf.output("blob");
      } else {
        pdf.save(filename);
        return pdf;
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
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

      // Replace {{field}} patterns IDK whats happening here honestly
      text = text.replace(/\{\{([^}]+)\}\}/g, (match, field) => {
        const value = this.getNestedValue(data, field.trim());
        return value !== undefined ? value : match;
      });

      textNode.textContent = text;
    });

    // image thingy
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
  }
}

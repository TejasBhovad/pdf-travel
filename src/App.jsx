import { useState } from "react";
import { PDFGenerator } from "./utils/pdf-generator";
import PDFDocument from "./components/pdf-document";
const App = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfData, setPdfData] = useState({
    title: "Professional",
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString(),
    company: {
      name: "Your Company Name",
      address: "123 Business St",
      city: "Business City",
      state: "BC",
      zip: "12345",
    },
    customer: {
      name: "John Doe",
      address: "456 Customer Ave",
      city: "Customer City",
      state: "CC",
      zip: "67890",
      email: "john@example.com",
    },
    items: [
      {
        description: "Web Development Services",
        quantity: 40,
        rate: 100,
        amount: 4000,
      },
      {
        description: "Design Consultation",
        quantity: 10,
        rate: 150,
        amount: 1500,
      },
    ],
    subtotal: 5500,
    taxRate: 8.5,
    tax: 467.5,
    total: 5967.5,
    notes: "Payment terms: Net 30 days",
    additionalTerms: "Custom terms and conditions for this project.",
  });

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const template = document.getElementById("pdf-template");
      template.style.display = "block";

      populateTemplate(template, pdfData);
      const generator = new PDFGenerator({
        format: "a4",
        orientation: "portrait",
        margin: 10,
        quality: 2,
      });

      await generator.generatePDF("pdf-template", "invoice.pdf");
      template.style.display = "none";
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const populateTemplate = (template, data) => {
    const walker = document.createTreeWalker(
      template,
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
        const value = getNestedValue(data, field.trim());
        return value !== undefined ? value : match;
      });
      textNode.textContent = text;
    });
    const itemsContainer = template.querySelector("#items-container");
    if (itemsContainer && data.items) {
      itemsContainer.innerHTML = "";
      data.items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="border border-gray-300 p-3">${item.description}</td>
          <td class="border border-gray-300 p-3 text-right">${item.quantity}</td>
          <td class="border border-gray-300 p-3 text-right">$${item.rate}</td>
          <td class="border border-gray-300 p-3 text-right">$${item.amount}</td>
        `;
        itemsContainer.appendChild(row);
      });
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const updateField = (path, value) => {
    const newData = { ...pdfData };
    const keys = path.split(".");
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setPdfData(newData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Control Panel */}
      <div className="bg-white shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">PDF Generator Demo</h1>

        {/* Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={pdfData.invoiceNumber}
              onChange={(e) => updateField("invoiceNumber", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={pdfData.customer.name}
              onChange={(e) => updateField("customer.name", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? "Generating PDF..." : "Generate PDF"}
        </button>
      </div>

      {/* preview */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        <PDFDocument data={pdfData} />
      </div>

      {/* hidden scene used to render pdfs */}
      <div id="pdf-template" style={{ display: "none" }}>
        <PDFDocument data={pdfData} />
      </div>
    </div>
  );
};

export default App;

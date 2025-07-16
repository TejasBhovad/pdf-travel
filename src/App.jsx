import { useState } from "react";
import { PDFGenerator } from "./utils/pdf-generator";
import ItineraryForm from "./components/itenerary-form";
import PDFDocument from "./components/pdf-document";

// Lucide Icons
import {
  Book,
  Calendar,
  User,
  DollarSign,
  MapPin,
  FileText,
  Loader2,
  FileDown,
  ClipboardList,
} from "lucide-react";

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
    items: [],
    subtotal: 0,
    taxRate: 8.5,
    tax: 0,
    total: 0,
    notes: "",
    additionalTerms: "",
  });

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const template = document.getElementById("pdf-template");
      template.style.display = "block";

      const generator = new PDFGenerator({
        format: "a4",
        orientation: "portrait",
        margin: 10,
        quality: 2,
      });

      await generator.generatePDF("pdf-template", "itinerary.pdf");
      template.style.display = "none";
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-accent/20 border-b-2 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-brand flex h-12 w-12 items-center justify-center rounded-xl">
                <Book className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-deep text-3xl font-bold">Travel Planner</h1>
                <p className="text-brand text-sm font-medium">
                  Plan your perfect journey
                </p>
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="bg-brand flex items-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#680099] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileDown className="h-5 w-5" />
                  <span>Export PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8">
          <ItineraryForm setPdfData={setPdfData} />
        </div>
      </main>

      {/* Hidden PDF Template */}
      <div id="pdf-template" style={{ display: "none" }}>
        <PDFDocument data={pdfData} />
      </div>
    </div>
  );
};

export default App;

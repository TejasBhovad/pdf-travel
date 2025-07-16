import React from "react";

const PDFDocument = ({ data = {} }) => {
  const ITEMS_PER_PAGE = 15;
  const items = Array.isArray(data.items) ? data.items : [];
  const itemChunks = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    itemChunks.push(items.slice(i, i + ITEMS_PER_PAGE));
  }
  if (itemChunks.length === 0) itemChunks.push([]);

  return (
    <div id="pdf-content" className="bg-white p-8 max-w-4xl mx-auto">
      <div className="pdf-page">
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {data.title || "Professional"} Invoice
          </h1>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm text-gray-600">
                Invoice #: {data.invoiceNumber || "INV-001"}
              </p>
              <p className="text-sm text-gray-600">
                Date: {data.date || new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {data.company?.name || "Company Name"}
              </p>
              <p className="text-sm">
                {data.company?.address || "Company Address"}
              </p>
              <p className="text-sm">
                {data.company?.city || "City"}, {data.company?.state || "State"}{" "}
                {data.company?.zip || "Zip"}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Bill To:</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold">
              {data.customer?.name || "Customer Name"}
            </p>
            <p>{data.customer?.address || "Customer Address"}</p>
            <p>
              {data.customer?.city || "City"}, {data.customer?.state || "State"}{" "}
              {data.customer?.zip || "Zip"}
            </p>
            <p>{data.customer?.email || "customer@email.com"}</p>
          </div>
        </div>

        {/* Items Table (first chunk) */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">
                  Description
                </th>
                <th className="border border-gray-300 p-3 text-right">
                  Quantity
                </th>
                <th className="border border-gray-300 p-3 text-right">Rate</th>
                <th className="border border-gray-300 p-3 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {itemChunks[0].length > 0 ? (
                itemChunks[0].map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">
                      {item.description}
                    </td>
                    <td className="border border-gray-300 p-3 text-right">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-3 text-right">
                      ${item.rate}
                    </td>
                    <td className="border border-gray-300 p-3 text-right">
                      ${item.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-300 p-3" colSpan="4">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {itemChunks.length === 1 && (
          <>
            <div className="flex justify-end mb-6">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>${data.subtotal || "0.00"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Tax ({data.taxRate || 0}%):</span>
                  <span>${data.tax || "0.00"}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-300 font-bold">
                  <span>Total:</span>
                  <span>${data.total || "0.00"}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4 text-sm text-gray-600">
              <p>{data.notes || "Thank you for your business!"}</p>
              <p className="mt-2">Thank you for your business!</p>
            </div>
          </>
        )}
      </div>
      {itemChunks.length > 1 &&
        itemChunks.slice(1).map((chunk, pageIdx) => (
          <React.Fragment key={pageIdx + 1}>
            <div className="page-break"></div>
            <div className="pdf-page">
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">
                        Description
                      </th>
                      <th className="border border-gray-300 p-3 text-right">
                        Quantity
                      </th>
                      <th className="border border-gray-300 p-3 text-right">
                        Rate
                      </th>
                      <th className="border border-gray-300 p-3 text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunk.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3">
                          {item.description}
                        </td>
                        <td className="border border-gray-300 p-3 text-right">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-300 p-3 text-right">
                          ${item.rate}
                        </td>
                        <td className="border border-gray-300 p-3 text-right">
                          ${item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pageIdx === itemChunks.length - 2 && (
                <>
                  <div className="flex justify-end mb-6">
                    <div className="w-64">
                      <div className="flex justify-between py-2">
                        <span>Subtotal:</span>
                        <span>${data.subtotal || "0.00"}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Tax ({data.taxRate || 0}%):</span>
                        <span>${data.tax || "0.00"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-t border-gray-300 font-bold">
                        <span>Total:</span>
                        <span>${data.total || "0.00"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 pt-4 text-sm text-gray-600">
                    <p>{data.notes || "Thank you for your business!"}</p>
                    <p className="mt-2">Thank you for your business!</p>
                  </div>
                </>
              )}
            </div>
          </React.Fragment>
        ))}
      <div className="page-break"></div>
      <div className="pdf-page mt-8">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <div className="space-y-3 text-sm">
          <p>1. Payment is due within 30 days of invoice date.</p>
          <p>2. Late payments may incur additional charges.</p>
          <p>3. All sales are final unless otherwise specified.</p>
          <p>4. {data.additionalTerms || "No additional terms specified."}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFDocument;

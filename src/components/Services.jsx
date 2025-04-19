import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const services = {
    "NGO Registration": [
      "Section 8 Registration",
      "Society Registration",
      "Trust Registration",
    ],
    "Company Registration": [
      "Private Limited",
      "OPC Pvt. Ltd",
      "LLP Registration",
      "Producer Company Registration",
    ],
    "Tax and Compliance": [
      "12A 80G Registration",
      "12AA Registration",
      "35AC Registration",
      "CSR Registration",
      "ITR Computation, Balance Sheet, Audit Report",
      "GST Registration",
    ],
    "Other Services": [
      "NGO Darpan (NITI Ayog)",
      "E-Anudan Registration",
      "Startup India Registration",
      "FCRA Registration",
      "RNI Registration",
      "Political Party Registration",
    ],
    "Business Registrations": [
      "Food/FSSAI Registration",
      "BIS, ISI Registration",
      "AGMARK Registration",
      "Trademark Registration",
      "Khanij Registration",
      "Travel Agency Registration",
      "Trade Export/Import Registration",
    ],
    "Additional Services": [
      "Project Creation",
      "App Development",
      "Software Development",
      "ISO Registration",
      "Labour Act Registration",
      "Trade Union Registration",
      "DGFT Registration",
      "Website Registration",
    ],
  };

  const handleFileUpload = (e) => {
    setUploadedFiles([...uploadedFiles, ...e.target.files]);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="min-h-[calc(100vh-64px-80px)] bg-gray-50 px-4 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Professional Services Portal
          </h1>
          <p className="text-gray-500 mt-2">
            {selectedService
              ? `Selected: ${selectedService}`
              : "Choose a service to get started"}
          </p>
        </div>

        {!selectedService ? (
          <div className="space-y-4">
            {Object.entries(services).map(([category, items]) => (
              <div
                key={category}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {category}
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      activeCategory === category ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeCategory === category && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((service) => (
                      <div
                        key={service}
                        onClick={() => handleServiceClick(service)}
                        className="p-3 border border-gray-200 rounded-md hover:border-cyan-400 hover:bg-cyan-50 cursor-pointer transition-colors"
                      >
                        <h3 className="font-medium text-gray-700">{service}</h3>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedService}
              </h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-sm text-cyan-600 hover:text-cyan-800 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to services
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">
                Upload Required Documents
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop files here, or click to select files
                  </p>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="mt-4 mx-auto"
                    label=""
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Selected files:
                    </h4>
                    <ul className="space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedService(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Documents submitted successfully!");
                  setSelectedService(null);
                  setUploadedFiles([]);
                }}
              >
                Submit Documents
              </Button>
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        <div className="fixed bottom-6 right-6">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.105 1.515 5.845L0 24l6.155-1.515A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.797 17.203c-.247.694-1.44 1.36-2.01 1.447-.514.08-1.18.114-3.99-1.68-3.33-2.07-5.48-5.78-5.65-6.05-.17-.27-1.35-1.79-1.35-3.42 0-1.63.85-2.43 1.15-2.77.3-.34.65-.43.86-.43h.65c.21 0 .48-.04.75.57.3.64.99 2.22 1.08 2.38.09.16.15.34.03.55-.13.21-.19.34-.38.53-.19.19-.34.4-.49.54-.17.17-.34.36-.15.7.19.34.85 1.4 1.82 2.27 1.25 1.11 2.3 1.45 2.64 1.6.34.15.54.13.74-.08.19-.21.85-.99 1.08-1.33.23-.34.45-.28.76-.17.3.11 1.9.89 2.23 1.05.34.17.57.26.65.41.08.15.08.7-.18 1.39z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
    "Tax and Compliance Registration": [
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
    "Business and Industry Registration": [
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

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 py-10">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#1A237E] mb-6 text-center">
          Welcome to Company Services
        </h1>

        {!selectedService ? (
          <div className="grid gap-8">
            {Object.entries(services).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold text-[#1A237E] mb-4">
                  {category}
                </h2>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((service) => (
                    <li
                      key={service}
                      className="p-4 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-[#FF6F00] hover:text-white transition-all cursor-pointer"
                      onClick={() => handleServiceClick(service)}
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-[#1A237E] mb-4">
              Selected Service: {selectedService}
            </h2>
            <p className="text-gray-600 mb-6">
              Please upload the required documents for this service.
            </p>
            <div className="mb-6">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                label="Upload Documents"
              />
            </div>
            <Button onClick={() => alert("Documents submitted successfully!")}>
              Submit Documents
            </Button>
            <Button
              className="ml-4"
              bgColor="bg-gray-500"
              hoverBgColor="hover:bg-gray-600"
              onClick={() => setSelectedService(null)}
            >
              Back to Services
            </Button>
          </div>
        )}

        {/* WhatsApp Icon */}
        <div className="fixed bottom-4 right-4">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
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

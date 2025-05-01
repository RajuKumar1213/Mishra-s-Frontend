import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import { Input, Button } from "../components";
import serviceCatalogService from "../services/serviceCatalogService";
import { useForm } from "react-hook-form";
import taskService from "../services/taskServices";
import toast from "react-hot-toast";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";

function RequestService() {
  const { serviceId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [serviceRequest, setServiceRequest] = useState({
    description: "",
  });
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    serviceCatalogService
      .getServiceById(serviceId)
      .then((response) => {
        if (response.statusCode === 200) {
          setService(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
      });
  }, [serviceId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleServiceRequest = () => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    const data = {
      serviceId,
      customerRequirements: serviceRequest.description,
      documents: uploadedFiles,
    };

    if (data.documents && Array.isArray(data.documents)) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    Object.keys(data).forEach((key) => {
      if (key !== "documents") {
        formData.append(key, data[key]);
      }
    });

    taskService
      .createTask(formData)
      .then((response) => {
        if (response.statusCode === 201) {
          toast.success("Service request submitted successfully!");
          navigate("/confirmation", {
            state: { taskId: response.data._id },
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting service request:", error);
        setError(extractErrorMessage(error));
        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Request Service
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-orange-600 hover:text-orange-700 flex items-center transition-colors"
            >
              <FiX className="mr-1" />
              Back to services
            </button>
          </div>

          <div className="space-y-6">
            {/* Service Info Section */}
            <div className="bg-orange-50 p-4 sm:p-5 rounded-lg border border-orange-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Service Details
              </h3>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-700 text-sm sm:text-base">
                    {service?.name}
                  </h4>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Our professional team will handle all aspects of your{" "}
                    <span className="font-medium text-orange-600">
                      {service?.name?.toLowerCase()}
                    </span>{" "}
                    service with complete documentation support and expert guidance.
                  </p>
                </div>
                <div className="flex items-center bg-orange-100 px-2.5 py-1 rounded-full w-fit">
                  <FaStar className="text-orange-500 mr-1 text-sm" />
                  <span className="text-xs font-medium text-orange-800">
                    Premium Service
                  </span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <form onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Additional Details
              </h3>
              <textarea
                className="w-full text-gray-800 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Describe your specific requirements (e.g., timeline, special requests)..."
                rows={4}
                onChange={(e) =>
                  setServiceRequest({
                    ...serviceRequest,
                    description: e.target.value,
                  })
                }
              />
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Please provide as much detail as possible to help us serve you better.
              </p>
            </form>

            {/* File Upload Section */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Upload Required Documents
              </h3>
              <p className="text-orange-500 text-xs sm:text-sm pb-2">
                Make sure you name your document correctly! (i.e income-certificate.jpg)
              </p>
              <div
                className={`border-2 border-dashed ${
                  uploadedFiles.length > 0
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-300"
                } rounded-xl p-6 sm:p-8 text-center transition-all`}
              >
                <div className="flex flex-col items-center">
                  <FiUpload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-1 text-sm sm:text-base">
                    <span className="font-medium text-orange-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    PDF, JPG, PNG files (max. 10MB each)
                  </p>
                </div>
                <label className="mt-4 inline-block">
                  <span className="sr-only">Choose files</span>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="block w-full text-xs sm:text-sm text-gray-500
                              file:mr-3 file:py-2 file:px-4 sm:file:px-6
                              file:rounded-lg file:border-0
                              file:text-xs sm:file:text-sm file:font-semibold
                              file:bg-orange-600 file:text-white
                              hover:file:bg-orange-700
                              transition-colors cursor-pointer"
                  />
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-2"
                >
                  <h4 className="text-xs sm:text-sm font-medium text-gray-700">
                    Selected files ({uploadedFiles.length}):
                  </h4>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center truncate">
                          <FiUpload className="text-gray-500 mr-2 flex-shrink-0 text-sm" />
                          <span className="text-xs sm:text-sm text-gray-600 truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-1 sm:ml-2">
                            {(file.size / 1024).toFixed(1)}KB
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <FiX className="text-sm" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={handleServiceRequest}
                disabled={uploadedFiles.length === 0}
                className={`px-6 py-2 text-sm sm:text-base flex items-center justify-center ${
                  uploadedFiles.length === 0
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {loading && (
                  <img
                    className="mr-2 h-5 sm:h-6 inline"
                    src={spinner}
                    alt="Loading"
                  />
                )}
                Submit Request
              </Button>
            </div>
          </div>
          <div className="fixed bottom-4 right-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RequestService;
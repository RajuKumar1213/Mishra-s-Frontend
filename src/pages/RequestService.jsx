import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import customerService from "../services/customerService";
import { FaStar } from "react-icons/fa";

function RequestService() {
  

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [recommendedServices, setRecommendedServices] = useState([]);
  const navigate = useNavigate();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedService}
            </h2>
            <button
              onClick={() => setSelectedService(null)}
              className="text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center"
            >
              <FiX className="mr-1" />
              Back to services
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Service Description
              </h3>
              <p className="text-gray-600">
                Our professional team will handle all aspects of your{" "}
                {selectedService}
                with complete documentation support and expert guidance.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">
                Additional Details
              </h3>
              <textarea
                value={serviceRequest.description}
                onChange={(e) =>
                  setServiceRequest({
                    ...serviceRequest,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6F00]/50 focus:border-transparent"
                placeholder="Describe your specific requirements..."
                rows={3}
              />
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">
                Upload Required Documents
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop files here, or click to select files
                </p>
                <label className="mt-4 inline-block">
                  <span className="sr-only">Choose files</span>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-[#FF6F00] file:text-white
                                  hover:file:bg-[#E65C00]"
                  />
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Selected files:
                  </h4>
                  <ul className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center">
                          <FiUpload className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedService(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleServiceRequest}
                disabled={uploadedFiles.length === 0}
              >
                Request Service
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RequestService;

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  FiUpload,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiX,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaRegStar,
  FaStar,
  FaRegCheckCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { RiServiceLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import customerService from "../services/customerService";
import toast from "react-hot-toast";
import { Button, Input } from "../components";

const CustomerHome = () => {
  const [customerData, setCustomerData] = useState({
    name: "Rajiv",
    email: "rajuvis@gmail.com",
    phone: "9546953892",
    address: "Daltonganj, Palamu, Jharkhand",
    state: "Jharkhand",
    pinCode: "822123",
    profilePicture:
      "https://res.cloudinary.com/dykqvsfd1/image/upload/v1745212097/zypdgohz4eqoe9iqm1xt.jpg",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("services");
  const [serviceRequest, setServiceRequest] = useState({
    description: "",
    documents: [],
  });
  const [recommendedServices, setRecommendedServices] = useState([]);
  const navigate = useNavigate();

  const services = {
    "NGO Registration": [
      { name: "Section 8 Registration", rating: 4.8, requests: 124 },
      { name: "Society Registration", rating: 4.5, requests: 89 },
      { name: "Trust Registration", rating: 4.7, requests: 112 },
    ],
    "Company Registration": [
      { name: "Private Limited", rating: 4.9, requests: 215 },
      { name: "OPC Pvt. Ltd", rating: 4.6, requests: 76 },
      { name: "LLP Registration", rating: 4.7, requests: 132 },
    ],
    "Tax and Compliance": [
      { name: "GST Registration", rating: 4.8, requests: 342 },
      { name: "ITR Filing", rating: 4.6, requests: 287 },
      { name: "12A 80G Registration", rating: 4.5, requests: 94 },
    ],
  };

  useEffect(() => {
    // Fetch customer data and recommended services
    const fetchData = async () => {
      try {
        // const response = await customerService.getProfile();
        // setCustomerData(response.data);

        // Get recommended services based on customer profile
        const recServices = [
          "GST Registration",
          "Private Limited Registration",
          "ITR Filing",
        ];
        setRecommendedServices(recServices);
      } catch (error) {
        toast.error("Error loading profile data");
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleServiceRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("service", selectedService);
      formData.append("description", serviceRequest.description);
      uploadedFiles.forEach((file) => formData.append("documents", file));

      // const response = await customerService.requestService(formData);
      toast.success("Service request submitted successfully!");
      setSelectedService(null);
      setUploadedFiles([]);
      setServiceRequest({ description: "", documents: [] });
    } catch (error) {
      toast.error("Failed to submit service request");
    }
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] bg-clip-text text-transparent">
              DropHeaven
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-[#FF6F00]">
              <FiMessageSquare className="w-5 h-5" />
              <span>Support</span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={customerData.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{customerData.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-4 text-white text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-white mb-4 overflow-hidden">
                  <img
                    src={customerData.profilePicture}
                    alt={customerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{customerData.name}</h2>
                <p className="text-sm opacity-90">{customerData.email}</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </h3>
                  <p className="mt-1 text-gray-700">{customerData.phone}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Address
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {customerData.address}, {customerData.state} -{" "}
                    {customerData.pinCode}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/customer-edit-profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Recommended Services */}
            <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <RiServiceLine className="mr-2 text-[#FF6F00]" />
                  Recommended For You
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {recommendedServices.map((service, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedService(service)}
                  >
                    <p className="font-medium text-gray-800">{service}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <div className="flex mr-2">{renderStars(4.5)}</div>
                      <span>120+ requests</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-3 font-medium ${
                  activeTab === "services"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 py-3 font-medium ${
                  activeTab === "requests"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Requests
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-3 font-medium ${
                  activeTab === "history"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                History
              </button>
            </div>

            {/* Services Content */}
            {activeTab === "services" && (
              <div className="mt-6">
                {!selectedService ? (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="p-4 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Browse Professional Services
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Select a service to get started
                        </p>
                      </div>

                      <div className="p-4 space-y-4">
                        {Object.entries(services).map(([category, items]) => (
                          <div
                            key={category}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleCategory(category)}
                              className="w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                            >
                              <h3 className="font-semibold text-gray-800">
                                {category}
                              </h3>
                              {activeCategory === category ? (
                                <FiChevronUp className="text-gray-500" />
                              ) : (
                                <FiChevronDown className="text-gray-500" />
                              )}
                            </button>

                            <AnimatePresence>
                              {activeCategory === category && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {items.map((service, index) => (
                                      <motion.div
                                        key={index}
                                        whileHover={{ y: -2 }}
                                        onClick={() =>
                                          setSelectedService(service.name)
                                        }
                                        className="p-4 border border-gray-200 rounded-lg hover:border-[#FF6F00]/50 hover:shadow-md cursor-pointer transition-all"
                                      >
                                        <div className="flex justify-between items-start">
                                          <h4 className="font-medium text-gray-800">
                                            {service.name}
                                          </h4>
                                          <div className="flex items-center text-sm text-gray-500">
                                            <span className="mr-1">
                                              {service.rating}
                                            </span>
                                            <FaStar className="text-yellow-400" />
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                          {service.requests}+ successful
                                          requests
                                        </p>
                                        <div className="mt-3 flex justify-between items-center">
                                          <span className="text-xs px-2 py-1 bg-[#FF6F00]/10 text-[#FF6F00] rounded-full">
                                            Popular
                                          </span>
                                          <span className="text-sm font-medium text-[#FF6F00]">
                                            Starting at ₹999
                                          </span>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
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
                            Our professional team will handle all aspects of
                            your {selectedService}
                            with complete documentation support and expert
                            guidance.
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
                )}
              </div>
            )}

            {/* My Requests Content */}
            {activeTab === "requests" && (
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Active Requests
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          GST Registration
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Requested on April 15, 2023
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <span className="mr-2">Assigned to:</span>
                      <div className="flex items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Professional"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>CA Ramesh Kumar</span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-3">
                      <button className="text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center">
                        <FiMessageSquare className="mr-1" />
                        Message
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <RiServiceLine className="mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Content */}
            {activeTab === "history" && (
              <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Service History
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Private Limited Company Registration
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Completed on March 28, 2023
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    <div className="mt-3 flex items-center">
                      <div className="flex mr-2">{renderStars(5)}</div>
                      <span className="text-sm text-gray-500">
                        Your rating: 5/5
                      </span>
                    </div>
                    <div className="mt-3">
                      <button className="text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center">
                        <RiServiceLine className="mr-1" />
                        View Documents
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default CustomerHome;

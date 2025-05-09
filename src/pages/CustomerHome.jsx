import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "../components";
import ServicesList from "../components/ServicesList";
import MyRequest from "../components/MyRequests";
import { useSelector } from "react-redux";
import CustomerTaskHistory from "../components/CustomerTaskHistory";

const CustomerHome = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("services");
  const [serviceRequest, setServiceRequest] = useState({
    description: "",
    documents: [],
  });
  const [recommendedServices, setRecommendedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        // const response = await customerService.getProfile();
        // setCustomerData(response.data);

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
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-4 text-white text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full border-4 border-white mb-4 overflow-hidden">
                  <img
                    src={userData?.customer?.profilePicture}
                    alt="profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">
                  {userData?.customer?.name}
                </h2>
                <p className="text-sm opacity-90">
                  {userData?.customer?.email}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {userData?.customer?.phone}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Address
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {userData?.customer?.address}, {userData?.customer?.state} -{" "}
                    {userData?.customer?.pinCode}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/customer-profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-3 font-medium whitespace-nowrap ${
                  activeTab === "services"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 py-3 font-medium whitespace-nowrap ${
                  activeTab === "requests"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Requests
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-3 font-medium whitespace-nowrap ${
                  activeTab === "history"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                History
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "services" && <ServicesList />}
            {activeTab === "requests" && <MyRequest />}
            {activeTab === "history" && <CustomerTaskHistory />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerHome;

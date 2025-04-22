import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaFileUpload,
  FaHistory,
} from "react-icons/fa";
import { RiServiceLine, RiVerifiedBadgeFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customerService";
import toast from "react-hot-toast";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      customerService.getCustomerDetails().then((response) => {
        if (response.statusCode === 200) {
          setCustomer(response.data.customer);
        }
      });
    };

    fetchCustomerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // const response = await customerService.updateProfile(formData);
      toast.success("Profile updated successfully!");
      setEditMode(false);
      // setCustomer(response.data);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Profile Card */}
          <motion.div
            variants={slideUp}
            className="bg-white rounded-2xl shadow-xl overflow-hidden w-full md:w-1/3"
          >
            <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 text-center text-white">
              <div className="relative mx-auto w-32 h-32 rounded-full border-4 border-white mb-4 overflow-hidden">
                <img
                  src={customer.profilePicture}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                />
                {customer.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-white text-[#FF6F00] rounded-full p-1">
                    <RiVerifiedBadgeFill className="text-xl" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="text-white/90">{customer.email}</p>
            </div>

            <div className="p-6">
              <button
                onClick={() => setEditMode(!editMode)}
                className="w-full flex items-center justify-center space-x-2 bg-[#FF6F00] text-white py-2 px-4 rounded-lg hover:bg-[#E65C00] transition-colors"
              >
                <FaEdit />
                <span>{editMode ? "Cancel Editing" : "Edit Profile"}</span>
              </button>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={slideUp}
            className="bg-white rounded-2xl shadow-xl overflow-hidden w-full md:w-2/3"
          >
            <div className="grid grid-cols-2 md:grid-cols-2 gap-1 p-1 bg-gray-100 rounded-t-2xl">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 font-medium flex flex-col items-center justify-center ${
                  activeTab === "profile"
                    ? "bg-white text-[#FF6F00]"
                    : "text-gray-600"
                } rounded-lg transition-colors`}
              >
                <FaUser className="text-xl mb-1" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 font-medium flex flex-col items-center justify-center ${
                  activeTab === "history"
                    ? "bg-white text-[#FF6F00]"
                    : "text-gray-600"
                } rounded-lg transition-colors`}
              >
                <FaHistory className="text-xl mb-1" />
                <span>History</span>
              </button>
            </div>

            <div className="p-6">
              {activeTab === "profile" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                    Personal Information
                  </h3>

                  {editMode ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FaUser className="text-[#FF6F00] mt-1 mr-3" />
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6F00]/50 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaEnvelope className="text-[#FF6F00] mt-1 mr-3" />
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6F00]/50 focus:border-transparent"
                              disabled
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaPhone className="text-[#FF6F00] mt-1 mr-3" />
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6F00]/50 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-[#FF6F00] mt-1 mr-3" />
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                              Address
                            </label>
                            <textarea
                              name="address"
                              value={formData.address || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FF6F00]/50 focus:border-transparent"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          onClick={() => setEditMode(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-[#FF6F00] text-white rounded-md hover:bg-[#E65C00]"
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FaUser className="text-[#FF6F00] mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="text-gray-800">{customer.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaEnvelope className="text-[#FF6F00] mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-800">{customer.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaPhone className="text-[#FF6F00] mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-800">{customer.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-[#FF6F00] mt-1 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-800">{customer.address}</p>
                          <p className="text-gray-600 text-sm">
                            {customer.state} - {customer.pinCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "history" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                    Service History
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        service: "GST Registration",
                        date: "15 Apr 2023",
                        status: "Completed",
                      },
                      {
                        service: "Company Incorporation",
                        date: "28 Mar 2023",
                        status: "Completed",
                      },
                      {
                        service: "Annual Filing",
                        date: "10 Feb 2023",
                        status: "Completed",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.service}</h4>
                            <p className="text-sm text-gray-500">{item.date}</p>
                          </div>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </div>
                        <button className="mt-3 text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerProfile;

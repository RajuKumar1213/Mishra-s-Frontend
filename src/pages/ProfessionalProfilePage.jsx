import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaAward,
  FaUserTie,
  FaIdCard,
  FaCity,
  FaHome,
} from "react-icons/fa";
import { MdVerified, MdAssignment } from "react-icons/md";
import professionalService from "../services/professionalService";

const ProfessionalProfilePage = () => {
  // Sample data - in a real app, this would come from props or API call
  const [professional, setProfessional] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  // fetching profile data
  useEffect(() => {
    professionalService
      .getProfDetails()
      .then((data) => {
        setProfessional(data.data.professional);
      })
      .catch((error) => {
        console.error("Error fetching professional details:", error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    // In a real app, you would open a form for editing
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-orange-100">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={professional.profilePicture}
                  alt={professional.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {professional.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-white text-[#FF6F00] rounded-full p-1">
                    <MdVerified className="text-lg" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {professional.name}
                    </h1>
                    <p className="text-orange-100 flex items-center mt-1">
                      <FaUserTie className="mr-2" />
                      {professional.role} - {professional.specialization}
                    </p>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-white text-[#FF6F00] rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-sm border border-orange-200"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center text-[#FF6F00] bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <FaAward className="mr-1" />
                    <span className="text-gray-700">
                      {professional.experience}+ years experience
                    </span>
                  </div>
                  <div
                    className={`flex items-center px-3 py-1 rounded-full ${
                      professional.isAvailable
                        ? "bg-green-500 bg-opacity-20"
                        : "bg-red-500 bg-opacity-20"
                    }`}
                  >
                    {professional.isAvailable ? "Available" : "Not Available"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-orange-200 pb-2">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-800">{professional.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-800">{professional.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Address
                    </h3>
                    <p className="text-gray-800">{professional.address}</p>
                    <p className="text-gray-600 text-sm">
                      {professional.city}, {professional.state} -{" "}
                      {professional.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-orange-200 pb-2">
                Professional Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaIdCard />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      PAN Card
                    </h3>
                    <a
                      href={professional.panCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6F00] hover:underline"
                    >
                      View PAN Card
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaIdCard />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Aadhar Card
                    </h3>
                    <a
                      href={professional.addharCard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6F00] hover:underline"
                    >
                      View Aadhar Card
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <MdAssignment />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Assigned Customers
                    </h3>
                    <p className="text-gray-800">
                      {professional.assigedCustomers?.length > 0
                        ? professional.assigedCustomers.join(", ")
                        : "No customers assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#FF6F00] mt-1 mr-3">
                    <FaHome />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Member Since
                    </h3>
                    <p className="text-gray-800">
                      {formatDate(professional.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-orange-50 px-6 py-4 sm:px-8 border-t border-orange-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center border border-orange-100">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-2xl font-bold text-[#FF6F00]">
                  {professional.rating || "N/A"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center border border-orange-100">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-2xl font-bold text-[#FF6F00]">
                  {professional.experience} years
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center border border-orange-100">
                <p className="text-sm text-gray-500">Customers</p>
                <p className="text-2xl font-bold text-[#FF6F00]">
                  {professional.assigedCustomers?.length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center border border-orange-100">
                <p className="text-sm text-gray-500">Status</p>
                <p
                  className={`text-2xl font-bold ${
                    professional.isAvailable ? "text-[#FF6F00]" : "text-red-600"
                  }`}
                >
                  {professional.isAvailable ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfilePage;

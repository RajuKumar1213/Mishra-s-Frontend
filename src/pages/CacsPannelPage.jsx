import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaMapMarkerAlt,
  FaAward,
  FaBusinessTime,
  FaTasks,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CacsPannelPage = () => {
  const navigate = useNavigate();

  const [profile] = useState({
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    assignedCustomers: [
      {
        id: 1,
        name: "John Doe",
        workDetails: "Tax Filing",
        status: "Pending",
        deadline: "2023-12-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        workDetails: "Audit Report",
        status: "In Progress",
        deadline: "2023-12-20",
      },
      {
        id: 3,
        name: "Robert Johnson",
        workDetails: "GST Compliance",
        status: "New",
        deadline: "2024-01-05",
      },
    ],
    name: "John CA",
    email: "johnca@example.com",
    state: "California",
    qualifications: "CA, CPA",
    experience: "5",
  });

  const handleStartWork = (customerId) => {
    console.log("Starting work for customer:", customerId);
    // Add your work start logic here
    navigate(`/professional/work/${customerId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "New":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            CA/CS Professional Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <span className="font-medium">{profile.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#FF6F00] p-4 text-white">
              <h2 className="text-xl font-semibold">Professional Profile</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#FF6F00] mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {profile.name}
                </h3>
                <p className="text-[#FF6F00] font-medium">
                  {profile.qualifications}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-[#FF6F00] mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-[#FF6F00] mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-800">{profile.state}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaAward className="text-[#FF6F00] mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="text-gray-800">{profile.experience} years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Assignment Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#FF6F00] p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Assignments</h2>
                <div className="flex items-center space-x-2">
                  <FaTasks className="text-white" />
                  <span>{profile.assignedCustomers.length} Active Tasks</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assig
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profile.assignedCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#FF6F00] rounded-full flex items-center justify-center text-white">
                              {customer.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {customer.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {customer.workDetails}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              customer.status
                            )}`}
                          >
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(customer.deadline).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleStartWork(customer.id)}
                            className="bg-[#FF6F00] hover:bg-[#E65C00] text-white py-1 px-3 rounded-md text-sm transition-colors"
                          >
                            {customer.status === "New"
                              ? "Start Work"
                              : "Continue"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stats Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center">
                    <FaBusinessTime className="text-[#FF6F00] text-xl mr-2" />
                    <h3 className="font-medium text-gray-700">
                      Total Assignments
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-[#FF6F00] mt-2">
                    {profile.assignedCustomers.length}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center">
                    <FaTasks className="text-[#FF6F00] text-xl mr-2" />
                    <h3 className="font-medium text-gray-700">In Progress</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#FF6F00] mt-2">
                    {
                      profile.assignedCustomers.filter(
                        (c) => c.status === "In Progress"
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center">
                    <FaUserTie className="text-[#FF6F00] text-xl mr-2" />
                    <h3 className="font-medium text-gray-700">
                      Years Experience
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-[#FF6F00] mt-2">
                    {profile.experience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacsPannelPage;

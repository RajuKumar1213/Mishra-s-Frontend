import React, { useState, useEffect } from "react";
import {
  FaUserTie,
  FaUsers,
  FaBell,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion } from "framer-motion";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);

  // Sample data - replace with API calls
  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: "CA Ramesh Kumar",
      specialization: "Taxation",
      rating: 4.8,
      experience: "5 years",
      availability: "Available",
      tasksCompleted: 42,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "CS Priya Sharma",
      specialization: "Company Law",
      rating: 4.6,
      experience: "3 years",
      availability: "Available",
      tasksCompleted: 28,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "CA Amit Patel",
      specialization: "Auditing",
      rating: 4.9,
      experience: "7 years",
      availability: "On Leave",
      tasksCompleted: 67,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rajiv Sharma",
      task: "GST Registration",
      status: "Pending",
      deadline: "2023-06-15",
      documents: 3,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 2,
      name: "Neha Gupta",
      task: "Company Incorporation",
      status: "In Progress",
      deadline: "2023-06-20",
      documents: 5,
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 3,
      name: "Amit Singh",
      task: "Tax Filing",
      status: "New",
      deadline: "2023-07-05",
      documents: 2,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ]);

  const handleAssignTask = (customerId, professionalId) => {
    const customer = customers.find((c) => c.id === customerId);
    const professional = professionals.find((p) => p.id === professionalId);

    if (customer && professional) {
      setAssignedTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          customerName: customer.name,
          professionalName: professional.name,
          task: customer.task,
          date: new Date().toISOString().split("T")[0],
          status: "Assigned",
        },
      ]);

      // Update customer status
      setCustomers(
        customers.map((c) =>
          c.id === customerId ? { ...c, status: "Assigned" } : c
        )
      );

      toast.success(`Assigned ${customer.task} to ${professional.name}`);
    }
  };

  const filteredProfessionals = professionals.filter(
    (pro) =>
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 bg-[#FF6F00]">
            <h1 className="text-xl font-bold text-white">DropHeaven</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                  activeTab === "dashboard"
                    ? "bg-[#FF6F00]/10 text-[#FF6F00]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <RiDashboardFill className="mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("professionals")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                  activeTab === "professionals"
                    ? "bg-[#FF6F00]/10 text-[#FF6F00]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaUserTie className="mr-3" />
                Professionals
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                  activeTab === "customers"
                    ? "bg-[#FF6F00]/10 text-[#FF6F00]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaUsers className="mr-3" />
                Customers
              </button>
              <button
                onClick={() => setActiveTab("reports")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                  activeTab === "reports"
                    ? "bg-[#FF6F00]/10 text-[#FF6F00]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaChartLine className="mr-3" />
                Reports
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full ${
                  activeTab === "settings"
                    ? "bg-[#FF6F00]/10 text-[#FF6F00]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <IoMdSettings className="mr-3" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button className="md:hidden p-2 mr-2 text-gray-500 rounded-md hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-[#FF6F00]/50 focus:bg-white"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
              <FaBell />
            </button>
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/41.jpg"
                alt="User"
              />
              <span className="ml-2 text-sm font-medium">Company Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#FF6F00]/10 text-[#FF6F00] mr-4">
                      <FaUserTie className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Active Professionals
                      </p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#FF6F00]/10 text-[#FF6F00] mr-4">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Customers</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#FF6F00]/10 text-[#FF6F00] mr-4">
                      <FaCheckCircle className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed Tasks</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Assignments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Recent Assignments</h2>
                  <button className="text-sm text-[#FF6F00] hover:text-[#E65C00]">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {assignedTasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-gray-500">
                          {task.customerName} → {task.professionalName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            task.status === "Assigned"
                              ? "bg-yellow-100 text-yellow-800"
                              : task.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status}
                        </span>
                        <span className="ml-4 text-sm text-gray-500">
                          {task.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Assign</h2>
                  <div className="space-y-4">
                    {customers.slice(0, 3).map((customer) => (
                      <div
                        key={customer.id}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                      >
                        <div className="flex items-center">
                          <img
                            src={customer.image}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">
                              {customer.task}
                            </p>
                          </div>
                        </div>
                        <select
                          className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:ring-[#FF6F00] focus:border-[#FF6F00]"
                          onChange={(e) =>
                            handleAssignTask(
                              customer.id,
                              parseInt(e.target.value)
                            )
                          }
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Assign to
                          </option>
                          {professionals
                            .filter((p) => p.availability === "Available")
                            .map((pro) => (
                              <option key={pro.id} value={pro.id}>
                                {pro.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Available Professionals
                  </h2>
                  <div className="space-y-4">
                    {professionals
                      .filter((p) => p.availability === "Available")
                      .slice(0, 3)
                      .map((pro) => (
                        <div
                          key={pro.id}
                          className="flex items-center p-3 border border-gray-100 rounded-lg"
                        >
                          <img
                            src={pro.image}
                            alt={pro.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{pro.name}</p>
                            <p className="text-sm text-gray-500">
                              {pro.specialization}
                            </p>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{pro.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "professionals" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">All Professionals</h2>
                  <button className="px-4 py-2 bg-[#FF6F00] text-white rounded-lg hover:bg-[#E65C00] transition-colors text-sm">
                    Add Professional
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Professional
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Specialization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Availability
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProfessionals.map((pro) => (
                        <tr key={pro.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="w-10 h-10 rounded-full mr-3"
                                src={pro.image}
                                alt={pro.name}
                              />
                              <div>
                                <div className="font-medium">{pro.name}</div>
                                <div className="text-sm text-gray-500">
                                  {pro.experience} experience
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pro.specialization}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span>{pro.rating}</span>
                              <span className="text-gray-400 ml-1">
                                ({pro.tasksCompleted})
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                pro.availability === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : pro.availability === "On Leave"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {pro.availability}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-[#FF6F00] hover:text-[#E65C00] mr-3">
                              View
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <BsThreeDotsVertical />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "customers" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Customer Requests</h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Filter
                    </button>
                    <button className="px-4 py-2 bg-[#FF6F00] text-white rounded-lg hover:bg-[#E65C00] transition-colors text-sm">
                      New Customer
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <img
                            src={customer.image}
                            alt={customer.name}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div>
                            <h3 className="font-medium">{customer.name}</h3>
                            <p className="text-sm text-gray-500">
                              Request #{customer.id}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            customer.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : customer.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : customer.status === "Assigned"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="font-medium text-[#FF6F00]">
                          {customer.task}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          <FaClock className="inline mr-1" />
                          Deadline: {customer.deadline}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Documents: {customer.documents} files
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <select
                          className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:ring-[#FF6F00] focus:border-[#FF6F00]"
                          onChange={(e) =>
                            handleAssignTask(
                              customer.id,
                              parseInt(e.target.value)
                            )
                          }
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Assign to
                          </option>
                          {professionals.map((pro) => (
                            <option key={pro.id} value={pro.id}>
                              {pro.name}
                            </option>
                          ))}
                        </select>
                        <button className="text-sm text-[#FF6F00] hover:text-[#E65C00]">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;

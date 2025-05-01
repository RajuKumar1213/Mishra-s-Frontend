import React, { useState, useEffect } from "react";
import {
  FaUserTie,
  FaUsers,
  FaBell,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaTimes,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import companyService from "../services/companyService";
import taskService from "../services/taskServices";
import toast from "react-hot-toast";
import spinner from "/spinner.svg";
import { ViewAllAssigned } from "../components";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [assignTask, setAssignTask] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    taskService
      .getCompanyTasks()
      .then((response) => {
        if (response.statusCode === 200) {
          setCustomers(response.data.tasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        toast.error("Failed to load customer tasks");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [assignTask]);

  useEffect(() => {
    setLoading(true);
    companyService
      .getAllProfessionals()
      .then((response) => {
        if (response.statusCode === 200) {
          setProfessionals(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching professionals:", error);
        toast.error("Failed to load professionals");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    companyService
      .getAllTasksAfterAssigned()
      .then((response) => {
        if (response.statusCode === 200) {
          setAssignedTasks(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching assigned tasks:", error);
        toast.error("Failed to load assigned tasks");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAssignTask = (taskId, professionalId) => {
    if (!professionalId) return;
    setAssignTask(true);
    taskService
      .companyAssignTaskToProfessional(taskId, professionalId)
      .then((response) => {
        if (response.statusCode === 200) {
          const customer = customers.find((c) => c._id === taskId);
          const professional = professionals.find((p) => p._id === professionalId);
          toast.success(`Assigned ${customer?.customerName} to ${professional?.name}`);
        }
      })
      .catch((error) => {
        console.error("Error assigning task:", error);
        toast.error("Error assigning task");
      })
      .finally(() => {
        setAssignTask(false);
      });
  };

  const filteredProfessionals = professionals?.filter(
    (pro) =>
      pro?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      pro?.specialization?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm">
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00]">
            <h1 className="text-xl font-bold text-white">DropHeaven</h1>
          </div>
          <div className="flex flex-col flex-grow px-3 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              {[
                { name: "dashboard", icon: <RiDashboardFill />, label: "Dashboard" },
                { name: "professionals", icon: <FaUserTie />, label: "Professionals" },
                { name: "customers", icon: <FaUsers />, label: "Customers" },
                { name: "reports", icon: <FaChartLine />, label: "Reports" },
                { name: "settings", icon: <IoMdSettings />, label: "Settings" },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setIsSidebarOpen(false); // Close sidebar on selection
                  }}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full transition-colors ${
                    activeTab === tab.name
                      ? "bg-orange-50 text-[#FF6F00] shadow-sm"
                      : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6F00]"
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-1/2 max-w-[200px] bg-white shadow-lg z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00]">
                <h1 className="text-xl font-bold text-white">DropHeaven</h1>
                <button onClick={toggleSidebar} className="text-white">
                  <FaTimes className="text-lg" />
                </button>
              </div>
              <div className="flex flex-col flex-grow px-3 py-4 overflow-y-auto">
                <nav className="flex-1 space-y-1">
                  {[
                    { name: "dashboard", icon: <RiDashboardFill />, label: "Dashboard" },
                    { name: "professionals", icon: <FaUserTie />, label: "Professionals" },
                    { name: "customers", icon: <FaUsers />, label: "Customers" },
                    { name: "reports", icon: <FaChartLine />, label: "Reports" },
                    { name: "settings", icon: <IoMdSettings />, label: "Settings" },
                  ].map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => {
                        setActiveTab(tab.name);
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full transition-colors ${
                        activeTab === tab.name
                          ? "bg-orange-50 text-[#FF6F00] shadow-sm"
                          : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6F00]"
                      }`}
                    >
                      <span className="mr-2 text-lg">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-3 sm:px-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center w-full max-w-md">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 mr-2 text-gray-500 rounded-full hover:bg-orange-50"
            >
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
                />
              </svg>
            </button>
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-sm bg-orange-50 border border-orange-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 rounded-full hover:bg-orange-50 hover:text-[#FF6F00] relative">
              <FaBell className="text-lg" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://randomuser.me/api/portraits/men/41.jpg"
                alt="User"
              />
              <span className="ml-2 text-sm font-medium hidden sm:block">Company Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {[
                  {
                    title: "Active Professionals",
                    value: professionals?.length || 0,
                    icon: <FaUserTie />,
                  },
                  {
                    title: "Active Customers",
                    value: customers?.length || 0,
                    icon: <FaUsers />,
                  },
                  {
                    title: "Completed Tasks",
                    value: assignedTasks?.filter((task) => task.status === "COMPLETED").length || 0,
                    icon: <FaCheckCircle />,
                  },
                  {
                    title: "Assigned Tasks",
                    value: assignedTasks?.filter((task) => task.status === "ASSIGNED").length || 0,
                    icon: <FaClock />,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <div className="p-2 sm:p-3 rounded-lg bg-orange-50 text-[#FF6F00] mr-3 sm:mr-4">
                        <span className="text-lg sm:text-xl">{stat.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Assignments */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5 mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Assignments</h2>
                  <button
                    onClick={() => setViewAll(!viewAll)}
                    className="text-sm text-[#FF6F00] hover:text-[#E65C00] font-medium transition-colors"
                  >
                    {viewAll ? "View Less" : "View All"}
                  </button>
                </div>
                <ViewAllAssigned viewAll={viewAll} assignedCustomers={{ tasks: assignedTasks }} />
              </div>

              {/* Quick Actions */}
              {!viewAll && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {/* Quick Assign */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Quick Assign</h2>
                    {loading ? (
                      <div className="flex justify-center">
                        <img className="h-6" src={spinner} alt="Loading" />
                      </div>
                    ) : customers?.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No new tasks to assign yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {customers?.slice(0, 4).map((customer) => (
                          <motion.div
                            key={customer._id}
                            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-orange-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center">
                              <img
                                src={customer?.customerProfile || "/default-profile.png"}
                                alt={customer?.customerName}
                                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3 object-cover"
                                onError={(e) => (e.target.src = "/default-profile.png")}
                              />
                              <div>
                                <p className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[150px]">
                                  {customer?.customerName}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">
                                  {customer?.serviceName}
                                </p>
                              </div>
                            </div>
                            <select
                              className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1 focus:ring-2 focus:ring-orange-500 bg-white"
                              onChange={(e) => handleAssignTask(customer._id, e.target.value)}
                              disabled={assignTask}
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Assign to
                              </option>
                              {assignTask ? (
                                <option disabled>Loading...</option>
                              ) : (
                                professionals?.map((pro) => (
                                  <option key={pro._id} value={pro._id}>
                                    {pro.name}
                                  </option>
                                ))
                              )}
                            </select>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Available Professionals */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Available Professionals</h2>
                    {loading ? (
                      <div className="flex justify-center">
                        <img className="h-6" src={spinner} alt="Loading" />
                      </div>
                    ) : professionals?.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No professionals available.</p>
                    ) : (
                      <div className="space-y-3">
                        {professionals?.slice(0, 4).map((pro) => (
                          <motion.div
                            key={pro._id}
                            className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-orange-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                          >
                            <img
                              src={pro.profilePicture || "/default-profile.png"}
                              alt={pro.name}
                              className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3 object-cover"
                              onError={(e) => (e.target.src = "/default-profile.png")}
                            />
                            <div className="flex-1">
                              <p className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[150px] sm:max-w-[200px]">
                                {pro.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500">
                                {pro.role} - {pro.specialization}
                              </p>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span>{pro.rating || "N/A"}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "professionals" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">All Professionals</h2>
                  <button className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-lg hover:from-[#E65C00] hover:to-[#E67C00] text-xs sm:text-sm font-medium transition-all duration-200">
                    Add Professional
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-orange-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Professional
                        </th>
                        <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Specialization
                        </th>
                        <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Availability
                        </th>
                        <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredProfessionals?.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                            No professionals found.
                          </td>
                        </tr>
                      ) : (
                        filteredProfessionals.map((pro) => (
                          <motion.tr
                            key={pro._id}
                            className="hover:bg-orange-50 transition-colors"
                            whileHover={{ scale: 1.005 }}
                          >
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex items-center">
                                <img
                                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3 object-cover"
                                  src={pro.profilePicture || "/default-profile.png"}
                                  alt={pro.name}
                                  onError={(e) => (e.target.src = "/default-profile.png")}
                                />
                                <div>
                                  <div className="text-sm sm:text-base font-medium text-gray-800">
                                    {pro.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    {pro.experience} yrs exp
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-[150px]">
                              {pro.specialization}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex items-center text-xs sm:text-sm">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{pro.rating || "N/A"}</span>
                              </div>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  pro.availability === "Available"
                                    ? "bg-green-100 text-green-800"
                                    : pro.availability === "On Leave"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {pro.availability || "Unknown"}
                              </span>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">
                              <button className="text-xs sm:text-sm text-[#FF6F00] hover:text-[#E65C00] mr-2 sm:mr-3 font-medium transition-colors">
                                View
                              </button>
                              <button className="text-gray-500 hover:text-gray-700">
                                <BsThreeDotsVertical className="text-sm" />
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "customers" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Customer Requests</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 sm:px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-orange-50 text-xs sm:text-sm text-gray-700 transition-colors">
                      Filter
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white rounded-lg hover:from-[#E65C00] hover:to-[#E67C00] text-xs sm:text-sm font-medium transition-all duration-200">
                      New Customer
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {loading ? (
                    <div className="col-span-full flex justify-center">
                      <img className="h-6" src={spinner} alt="Loading" />
                    </div>
                  ) : customers?.length === 0 ? (
                    <div className="col-span-full text-center py-6 text-sm text-gray-500">
                      No customer requests found.
                    </div>
                  ) : (
                    customers.map((customer) => (
                      <motion.div
                        key={customer._id}
                        className="border border-gray-100 rounded-lg p-3 sm:p-4 bg-white hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center">
                            <img
                              src={customer.customerProfile || "/default-profile.png"}
                              alt={customer.customerName}
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-2 sm:mr-3 object-cover"
                              onError={(e) => (e.target.src = "/default-profile.png")}
                            />
                            <div>
                              <h3 className="text-sm sm:text-base font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[150px]">
                                {customer.customerName}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Request #{customer._id?.slice(-6).toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              customer.status === "New"
                                ? "bg-blue-100 text-blue-800"
                                : customer.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : customer.status === "Assigned"
                                ? "bg-purple-100 text-purple-800"
                                : customer.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </div>
                        <div className="mb-2 sm:mb-3">
                          <p className="text-sm font-medium text-[#FF6F00] truncate">
                            {customer.serviceName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <FaClock className="mr-1" />
                            Assigned: {new Date(customer.assignedAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <select
                            className="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1 focus:ring-2 focus:ring-orange-500 bg-white"
                            onChange={(e) => handleAssignTask(customer._id, e.target.value)}
                            disabled={assignTask || customer.status !== "New"}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Assign to
                            </option>
                            {assignTask ? (
                              <option disabled>Loading...</option>
                            ) : (
                              professionals?.map((pro) => (
                                <option key={pro._id} value={pro._id}>
                                  {pro.name}
                                </option>
                              ))
                            )}
                          </select>
                          <button className="text-xs sm:text-sm text-[#FF6F00] hover:text-[#E65C00] font-medium transition-colors">
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Reports</h2>
                <p className="text-sm text-gray-500">Reports section coming soon!</p>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-5">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Settings</h2>
                <p className="text-sm text-gray-500">Settings section coming soon!</p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
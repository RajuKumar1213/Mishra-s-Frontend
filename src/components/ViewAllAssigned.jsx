import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import companyService from "../services/companyService";
import spinner from "/spinner.svg";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";

function ViewAllAssigned({ viewAll, change, assignedCustomers }) {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use assignedCustomers from CompanyDashboard if provided, else fetch
    if (assignedCustomers?.tasks?.length) {
      setAssignedTasks(assignedCustomers.tasks);
      setLoading(false);
    } else {
      setLoading(true);
      companyService
        .getAllTasksAfterAssigned()
        .then((response) => {
          if (response.statusCode === 200) {
            setAssignedTasks(response.data);
          } else {
            toast.error("Failed to load assigned tasks");
          }
        })
        .catch((error) => {
          console.error("Error fetching assigned tasks:", error);
          toast.error("Error fetching tasks");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [change, assignedCustomers]);

  // Animation variants for task cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Status styling configuration
  const statusStyles = {
    ASSIGNED: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Assigned" },
    IN_PROGRESS: { bg: "bg-blue-100", text: "text-blue-800", label: "In Progress" },
    COMPLETED: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Completed" },
    DOCUMENT_UPLOADED: { bg: "bg-purple-100", text: "text-purple-800", label: "Docs Uploaded" },
    default: { bg: "bg-gray-100", text: "text-gray-800", label: "New" },
  };



  return (
    <div className="space-y-3">
      {loading ? (
        <div className="flex justify-center py-4">
          <img className="h-6 animate-spin" src={spinner} alt="Loading..." />
        </div>
      ) : assignedTasks?.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-4">No assigned tasks yet.</p>
      ) : (
        <AnimatePresence>
          {(viewAll ? assignedTasks : assignedTasks.slice(0, 3)).map((task) => {
            const status = statusStyles[task?.status] || statusStyles.default;
            return (
              <motion.div
                key={task._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 items-start sm:items-center justify-between p-3 sm:p-4 bg-white border border-gray-100 rounded-lg hover:bg-orange-50 hover:shadow-md transition-all duration-200"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center w-full sm:w-auto">
                  <Link to={`/customer-details/${task?.customer?._id}`} className="flex-shrink-0">
                    <img
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-orange-100"
                      src={task?.customer?.profilePicture || "/default-profile.png"}
                      alt={task?.customer?.name || "Customer"}
                      onError={(e) => (e.target.src = "/default-profile.png")}
                    />
                  </Link>
                  <div className="ml-3 sm:ml-4 flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-800 truncate max-w-[200px] sm:max-w-[300px]">
                      {task?.service?.name || "Untitled Service"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center mt-1">
                      <span className="truncate max-w-[100px] sm:max-w-[150px]">
                        {task?.customer?.name || "Unknown Customer"}
                      </span>
                      <FaArrowRight className="mx-2 text-orange-500" />
                      <Link to={`/professional-details/${task?.professional?._id}`} className="flex items-center">
                        <img
                          className="h-6 w-6 rounded-full object-cover mr-1 sm:mr-2 border border-orange-100"
                          src={task?.professional?.profilePicture || "/default-profile.png"}
                          alt={task?.professional?.name || "Professional"}
                          onError={(e) => (e.target.src = "/default-profile.png")}
                        />
                        <span className="truncate max-w-[100px] sm:max-w-[150px]">
                          {task?.professional?.name || "Unknown Professional"}
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start w-full sm:w-auto">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text} capitalize`}
                  >
                    {status.label}
                  </span>
                  <span className="mt-2 sm:mt-0 sm:ml-4 text-xs sm:text-sm text-gray-500">
                    {task?.assignedAt
                      ? format(new Date(task.assignedAt), "dd MMM yyyy")
                      : "N/A"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}

export default ViewAllAssigned;
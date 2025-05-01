import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { RiServiceLine } from "react-icons/ri";
import taskService from "../services/taskServices";
import spinner from "/spinner.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const statusStyles = {
  NEW: "bg-blue-100 text-blue-800",
  DOCUMENTS_UPLOADED: "bg-purple-100 text-purple-800",
  ASSIGNED: "bg-indigo-100 text-indigo-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800 animate-pulse",
  COMPLETED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  DEFAULT: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  NEW: "New",
  DOCUMENTS_UPLOADED: "Document Uploaded",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

function MyRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setLoading(true);
    taskService
      .getCustomerAllTasks()
      .then((response) => {
        if (response.statusCode === 200) {
          setTasks(response.data);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-4 bg-white rounded-xl shadow-sm p-2 md:p-4 sm:p-6 text-center max-w-4xl mx-auto">
        <img className="inline-block w-8 h-8" src={spinner} alt="Loading..." />
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="mt-4 bg-white rounded-xl shadow-sm p-4 sm:p-6 text-center max-w-4xl mx-auto">
        <h2 className="text-base sm:text-lg font-light text-gray-500">
          No tasks found. Choose some service to get started.
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm overflow-hidden p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
        Your Active Requests
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => {
          const statusClass = statusStyles[task.status] || statusStyles.DEFAULT;
          const statusLabel = statusLabels[task.status] || "Unknown";

          return (
            <div
              key={task._id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <h3 className="font-medium text-gray-800 text-base sm:text-lg">
                    {task?.serviceName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Requested on {format(new Date(task?.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${statusClass} w-fit`}
                >
                  {statusLabel}
                </span>
              </div>

              <div className="mt-3 flex items-center text-xs sm:text-sm text-gray-500">
                <span className="mr-2">Assigned to:</span>
                <span>
                  {task?.professional?.name || "Not assigned to any professional yet"}
                </span>
              </div>

              <div className="mt-3 flex space-x-3">
                <Link to={`details/${task._id}`}>
                  <button className="text-xs sm:text-sm text-orange-500 hover:text-orange-700 flex items-center">
                    <RiServiceLine className="mr-1" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyRequests;
import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { RiServiceLine } from "react-icons/ri";
import taskService from "../services/taskServices";
import spinner from "/spinner.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Your Active Requests
      </h2>
      {loading ? (
        <img className="mx-auto" src={spinner} />
      ) : (
        tasks?.length &&
        tasks.map((task) => (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {task?.serviceName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Requested on{" "}
                    {format(new Date(task?.createdAt), "dd MMMM yyyy")}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {task?.status === "NEW"
                    ? "New"
                    : task?.status === "DOCUMENTS_UPLOADED"
                    ? "Document Uploaded"
                    : task?.status === "ASSIGNED"
                    ? "Assigned"
                    : task?.status === "IN_PROGRESS"
                    ? "In Progress"
                    : task?.status === "COMPLETED"
                    ? "Completed"
                    : task?.status === "REJECTED"
                    ? "Rejected"
                    : "Unknown"}
                </span>
              </div>
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <span className="mr-2">Assigned to:</span>
                <div className="flex items-center">
                  {/* <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Professional"
                    className="w-6 h-6 rounded-full mr-2"
                  /> */}
                  <span>
                    {task?.professional
                      ? "Professional"
                      : "Not assigned to any professional yet"}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex space-x-3">
                {/* <button className="text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center">
                  <FiMessageSquare className="mr-1" />
                  Message
                </button> */}
                <Link to={`details/${task._id}`}>
                  <button className="text-sm cursor-pointer text-orange-500 hover:text-orange-700 flex items-center">
                    <RiServiceLine className="mr-1" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;

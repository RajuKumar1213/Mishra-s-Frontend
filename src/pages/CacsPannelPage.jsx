import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaMapMarkerAlt,
  FaAward,
  FaBusinessTime,
  FaTasks,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import taskService from "../services/taskServices";
import { ProfessionalAssignmentTask } from "../components";
import spinner from "/spinner.svg";
import { useSelector } from "react-redux";

const CacsPannelPage = () => {
  const navigate = useNavigate();
  const [assignedTask, setAssignedTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    taskService
      .getProfessionalTasks()
      .then((response) => {
        if (response.statusCode === 200) {
          setAssignedTask(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <div className="max-w-5xl md:max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">
            CA/CS Professional Dashboard
          </h1>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to={"/professional-profile"}>
              <img
                src={userData?.professional?.profilePicture}
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
              />
            </Link>
            <span className="text-sm sm:text-base font-medium">
              {userData?.professional?.name} - {userData?.professional?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Work Assignment Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#FF6F00] p-4 sm:p-5 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">Your Assignments</h2>
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <FaTasks className="text-white" />
                <span>{assignedTask?.tasks?.length} Active Tasks</span>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="overflow-x-auto">
              {loading ? (
                <img
                  className="mx-auto w-8 h-8 sm:w-10 sm:h-10"
                  src={spinner}
                  alt="Loading"
                />
              ) : !assignedTask?.tasks?.length ? (
                <p className="text-sm sm:text-base text-gray-700 text-center">
                  No assignments yet. Stay tuned, new tasks will be assigned soon!
                </p>
              ) : (
                <ProfessionalAssignmentTask assignedCustomers={assignedTask} />
              )}
            </div>

            {/* Stats Section */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                <div className="flex items-center">
                  <FaBusinessTime className="text-[#FF6F00] text-lg sm:text-xl mr-2" />
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    Total Assignments
                  </h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF6F00] mt-2">
                  {assignedTask?.tasks?.length}
                </p>
              </div>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                <div className="flex items-center">
                  <FaTasks className="text-[#FF6F00] text-lg sm:text-xl mr-2" />
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    In Progress
                  </h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF6F00] mt-2">
                  {
                    assignedTask?.tasks?.filter((c) => c.status === "IN_PROGRESS")
                      .length
                  }
                </p>
              </div>
              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-100">
                <div className="flex items-center">
                  <FaUserTie className="text-[#FF6F00] text-lg sm:text-xl mr-2" />
                  <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                    Years Experience
                  </h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#FF6F00] mt-2">
                  {userData?.professional?.experience || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacsPannelPage;
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
          console.log(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
      <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white px-6 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            CA/CS Professional Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Link to={"/professional-profile"}>
              <img
                src={userData?.professional?.profilePicture}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </Link>
            <span className="font-medium">
              {userData?.professional?.name} - {userData?.professional?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Summary Card */}
        {/* <div className="max-w-2xs">
          <div className="bg-white w-full rounded-xl shadow-md overflow-hidden">
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
        </div> */}

        {/* Work Assignment Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#FF6F00] p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Assignments</h2>
                <div className="flex items-center space-x-2">
                  <FaTasks className="text-white" />
                  <span>{assignedTask?.tasks?.length} Active Tasks</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                {loading ? (
                  <img className="mx-auto" src={spinner} alt="Loading" />
                ) : !assignedTask?.tasks?.length ? (
                  <h2 className="font-thin text-lg text-gray-700">
                    No Assignment yet. Stay tuned company will assign you tasks
                    very shortly!
                  </h2>
                ) : (
                  <ProfessionalAssignmentTask
                    assignedCustomers={assignedTask}
                  />
                )}
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
                    {assignedTask?.tasks?.length}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center">
                    <FaTasks className="text-[#FF6F00] text-xl mr-2" />
                    <h3 className="font-medium text-gray-700">In Progress</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#FF6F00] mt-2">
                    {
                      assignedTask?.tasks?.filter(
                        (c) => c.status === "IN_PROGRESS"
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
                    {userData?.professional?.experience || 0}
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

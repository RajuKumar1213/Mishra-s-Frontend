import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiFile,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Button } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import taskService from "../services/taskServices";

function ServiceConfirmation() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();
  const taskId = location.state?.taskId;
  const [task, setTask] = useState(null);

  useEffect(() => {
    taskService
      .getCustomerTaskById(taskId)
      .then((response) => {
        if (response.statusCode === 200) {
          setTask(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
      });
  }, [taskId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 sm:p-8 text-white">
          <div className="flex items-center justify-center mb-3">
            <FiCheckCircle className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Service Request Confirmed!
          </h1>
          <p className="text-center text-orange-100 text-sm sm:text-base max-w-xl mx-auto">
            Your{" "}
            <span className="font-medium text-white">
              {task?.service?.name}
            </span>{" "}
            request has been successfully submitted. Our team will review your
            documents and get back to you shortly.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
            {/* Service Details */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiFile className="text-orange-500 mr-2 text-lg" />
                Service Details
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500">Service Requested</p>
                  <p className="font-medium text-orange-400 text-sm sm:text-base">
                    {task?.service?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {task?.service?.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Submitted Documents</p>
                  <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm">
                    {task?.documents?.map((doc, index) => (
                      <div key={doc._id} className="space-y-1">
                        <li className="truncate">
                          {doc.name}{" "}
                          <span
                            onClick={() => window.open(doc.fileUrl, "_blank")}
                            className="text-orange-500 text-xs underline cursor-pointer"
                          >
                            view Document
                          </span>
                        </li>
                        <p className="text-xs text-gray-400">
                          {doc.description}
                        </p>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiUser className="text-orange-500 mr-2 text-lg" />
                Your Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-sm sm:text-base">{userData?.customer?.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Email Address</p>
                  <p className="font-medium flex items-center text-sm sm:text-base">
                    <FiMail className="mr-2 text-gray-400 text-sm" />
                    {userData?.customer?.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium flex items-center text-sm sm:text-base">
                    <FiPhone className="mr-2 text-gray-400 text-sm" />
                    {userData?.customer?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
              What Happens Next?
            </h3>
            <ol className="space-y-3">
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Document Review</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Our team will verify your submitted documents within 24
                    hours.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Status Updates</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    You'll receive email notifications at each stage of the
                    process.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Completion</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Your processed documents will be delivered via your
                    preferred method.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => navigate("/customer-home")}
              variant="outline"
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceConfirmation;
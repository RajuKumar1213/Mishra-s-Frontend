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

  // Sample data - in a real app this would come from your state or API

  // fetching task details
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

  console.log(task);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <FiCheckCircle className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            Service Request Confirmed!
          </h1>
          <p className="text-center text-orange-100 max-w-2xl mx-auto">
            Your{" "}
            {
              <span className="font-medium text-gray-600">
                {task?.service?.name}
              </span>
            }{" "}
            request has been successfully submitted. Our team will review your
            documents and get back to you shortly.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Reference Card */}
          {/* <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Reference Number
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {serviceDetails.referenceNumber}
                </p>
              </div>
              <div className="flex items-center">
                <FiClock className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-700">
                  Estimated completion: {serviceDetails.estimatedCompletion}
                </span>
              </div>
            </div>
          </div> */}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Service Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiFile className="text-orange-500 mr-2" />
                Service Details
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Service Requested</p>
                  <p className="font-medium text-orange-400">
                    {task?.service?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {task?.service?.description}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted Documents</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {task?.documents?.map((doc, index) => (
                      <div key={doc._id} className="space-y-2">
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
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="text-orange-500 mr-2" />
                Your Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userData?.customer?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium flex items-center">
                    <FiMail className="mr-2 text-gray-400" />
                    {userData.customer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium flex items-center">
                    <FiPhone className="mr-2 text-gray-400" />
                    {userData.customer.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              What Happens Next?
            </h3>
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                    1
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Document Review</p>
                  <p className="text-gray-600">
                    Our team will verify your submitted documents within 24
                    hours.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                    2
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Status Updates</p>
                  <p className="text-gray-600">
                    You'll receive email notifications at each stage of the
                    process.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                    3
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Completion</p>
                  <p className="text-gray-600">
                    Your processed documents will be delivered via your
                    preferred method.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate("/customer-home")}
              variant="outline"
              className="px-6 py-3"
            >
              Back to Dashboard
            </Button>
            {/* <Button
              onClick={() => window.print()}
              className="bg-orange-600 hover:bg-orange-700 px-6 py-3"
            >
              Print Confirmation
            </Button> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceConfirmation;

import React, { useEffect, useState } from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiPrinter,
  FiShare2,
  FiArrowLeft,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Button } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskServices";

function TaskDetails() {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    taskService
      .getCustomerTaskById(taskId)
      .then((response) => {
        if (response.statusCode === 200) {
          setRequestData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
      });
  }, [taskId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Get status display info
  const getStatusInfo = (status) => {
    switch (status) {
      case "DOCUMENTS_UPLOADED":
        return {
          text: "Document Uploaded",
          color: "bg-orange-100 text-orange-800",
          icon: <FiFileText className="mr-1 text-sm" />,
        };
      case "ASSIGNED":
        return {
          text: "Assigned",
          color: "bg-yellow-200 text-yellow-900",
          icon: <FiUser className="mr-1 text-sm" />,
        };
      case "IN_PROGRESS":
        return {
          text: "In Progress",
          color: "bg-blue-200 text-blue-900",
          icon: <FiClock className="mr-1 text-sm" />,
        };
      case "COMPLETED":
        return {
          text: "Completed",
          color: "bg-emerald-200 text-emerald-900",
          icon: <FiCheckCircle className="mr-1 text-sm" />,
        };
      default:
        return {
          text: status,
          color: "bg-slate-100 text-slate-800",
          icon: <FiClock className="mr-1 text-sm" />,
        };
    }
  };

  const statusInfo = getStatusInfo(requestData?.status);

  const finalDoc = requestData?.documents?.filter(
    (doc) => doc.uploadedByRole === "Professional"
  );

  const customerUploadedDocs = requestData?.documents?.filter(
    (doc) => doc.uploadedByRole === "Customer"
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-orange-600 hover:text-orange-700 transition-colors text-sm sm:text-base"
            >
              <FiArrowLeft className="mr-1 text-lg" />
              Back to requests
            </button>
            <span
              className={`px-2.5 py-1 inline-flex items-center text-xs sm:text-sm font-semibold rounded-full ${statusInfo.color}`}
            >
              {statusInfo.icon}
              {statusInfo.text}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-3 sm:mt-4">
            {requestData?.service?.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Request ID: {requestData?._id}
          </p>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-5">
          {/* Service and Customer Info */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
            {/* Service Details */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiFileText className="text-orange-500 mr-2 text-lg" />
                Service Details
              </h2>
              <div className="space-y-3 text-gray-500">
                <div>
                  <p className="text-xs sm:text-sm text-gray-700">Category</p>
                  <p className="font-medium text-sm sm:text-base">
                    {requestData?.service?.category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-700">Service Description</p>
                  <p className="font-medium text-sm sm:text-base">
                    {requestData?.service?.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-700">Your Requirements</p>
                  <p className="font-medium italic text-sm sm:text-base">
                    "{requestData?.customerRequirements}"
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FiUser className="text-orange-500 mr-2 text-lg" />
                Your Information
              </h2>
              <div className="space-y-3 text-gray-500">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-sm sm:text-base">{requestData?.customer?.name}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Email</p>
                  <p className="font-medium text-sm sm:text-base">{requestData?.customer?.email}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-sm sm:text-base">{requestData?.customer?.phone}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Request Date</p>
                  <p className="font-medium text-sm sm:text-base">
                    {formatDate(requestData?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <FiFileText className="text-orange-500 mr-2 text-lg" />
              Submitted Documents by You ({customerUploadedDocs?.length})
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-3 sm:p-4 border-b border-gray-200">
                <div className="col-span-6 font-medium text-gray-700 text-sm">Document Name</div>
                <div className="col-span-3 font-medium text-gray-700 text-sm">Type</div>
                <div className="col-span-2 font-medium text-gray-700 text-sm">Size</div>
                <div className="col-span-1 font-medium text-gray-700 text-sm">Actions</div>
              </div>

              {customerUploadedDocs?.map((doc) => (
                <div
                  key={doc._id}
                  className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-4 border-b border-gray-200 hover:bg-gray-50"
                >
                  <div className="sm:col-span-6 flex items-center mb-2 sm:mb-0">
                    <FiFileText className="text-orange-500 mr-2 sm:mr-3 text-lg" />
                    <span className="truncate text-sm sm:text-base">{doc.name}</span>
                  </div>
                  <div className="sm:col-span-3 text-gray-600 text-sm mb-2 sm:mb-0">
                    <span className="sm:hidden font-medium">Type: </span>{doc.fileType}
                  </div>
                  <div className="sm:col-span-2 text-gray-600 text-sm mb-2 sm:mb-0">
                    <span className="sm:hidden font-medium">Size: </span>{formatFileSize(doc.fileSize)}
                  </div>
                  <div className="sm:col-span-1 flex justify-start sm:justify-end space-x-2">
                    <button
                      onClick={() => window.open(doc.fileUrl, "_blank")}
                      className="text-orange-600 hover:text-orange-700 p-1"
                      title="View Document"
                    >
                      <FiEye className="text-lg" />
                    </button>
                    <button
                      onClick={() =>
                        window.open(doc.fileUrl, "_blank", "download")
                      }
                      className="text-gray-600 hover:text-gray-700 p-1"
                      title="Download"
                    >
                      <FiDownload className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <FiFileText className="text-orange-500 mr-2 text-lg" />
              Final Documents ({finalDoc?.length})
            </h2>

            {!finalDoc?.length ? (
              <p className="text-sm sm:text-base text-gray-700">
                You will see your final documents here
              </p>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-3 sm:p-4 border-b border-gray-200">
                  <div className="col-span-6 font-medium text-gray-700 text-sm">Document Name</div>
                  <div className="col-span-3 font-medium text-gray-700 text-sm">Type</div>
                  <div className="col-span-2 font-medium text-gray-700 text-sm">Size</div>
                  <div className="col-span-1 font-medium text-gray-700 text-sm">Actions</div>
                </div>

                {finalDoc?.map((doc) => (
                  <div
                    key={doc._id}
                    className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-4 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <div className="sm:col-span-6 flex items-center mb-2 sm:mb-0">
                      <FiFileText className="text-orange-500 mr-2 sm:mr-3 text-lg" />
                      <span className="truncate text-sm sm:text-base">{doc.name}</span>
                    </div>
                    <div className="sm:col-span-3 text-gray-600 text-sm mb-2 sm:mb-0">
                      <span className="sm:hidden font-medium">Type: </span>{doc.fileType}
                    </div>
                    <div className="sm:col-span-2 text-gray-600 text-sm mb-2 sm:mb-0">
                      <span className="sm:hidden font-medium">Size: </span>{formatFileSize(doc.fileSize)}
                    </div>
                    <div className="sm:col-span-1 flex justify-start sm:justify-end space-x-2">
                      <button
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                        className="text-orange-600 hover:text-orange-700 p-1"
                        title="View Document"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(doc.fileUrl, "_blank", "download")
                        }
                        className="text-gray-600 hover:text-gray-700 p-1"
                        title="Download"
                      >
                        <FiDownload className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <FiClock className="text-orange-500 mr-2 text-lg" />
              Request Timeline
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-200"></div>

              <div className="space-y-4">
                {requestData?.updates?.map((update, index) => (
                  <div key={update._id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-orange-500 border-3 border-orange-100"></div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            {update.message}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {formatDate(update.createdAt)}
                          </p>
                        </div>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Latest
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-4 border-t border-gray-200">
            <div className="text-xs sm:text-sm text-gray-500">
              Last updated: {formatDate(requestData?.updatedAt)}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center text-sm sm:text-base px-3 sm:px-4 py-2 w-full sm:w-auto"
              >
                <FiPrinter className="mr-1 sm:mr-2 text-lg" />
                Print Details
              </Button>
              <Button
                variant="outline"
                className="flex items-center text-sm sm:text-base px-3 sm:px-4 py-2 w-full sm:w-auto"
              >
                <FiShare2 className="mr-1 sm:mr-2 text-lg" />
                Share Request
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 flex items-center text-sm sm:text-base px-3 sm:px-4 py-2 w-full sm:w-auto"
              >
                <FiCheckCircle className="mr-1 sm:mr-2 text-lg" />
                Need Help?
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TaskDetails;
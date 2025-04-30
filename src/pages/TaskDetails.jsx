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
import { motion, useScroll } from "framer-motion";
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

  console.log(requestData);

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
          text: "Documents Uploaded",
          color: "bg-orange-100 text-orange-800",
          icon: <FiFileText className="mr-2" />,
        };
      // Add other status cases as needed
      default:
        return {
          text: status,
          color: "bg-gray-100 text-gray-800",
          icon: <FiClock className="mr-2" />,
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
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to requests
            </button>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
              >
                {statusInfo.icon}
                {statusInfo.text}
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {requestData?.service?.name}
          </h1>
          <p className="text-gray-600 mt-1">Request ID: {requestData?._id}</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Service and Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Service Details */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiFileText className="text-orange-500 mr-2" />
                Service Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">
                    {requestData?.service?.category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Description</p>
                  <p className="font-medium">
                    {requestData?.service?.description}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Requirements</p>
                  <p className="font-medium italic">
                    "{requestData?.customerRequirements}"
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="text-orange-500 mr-2" />
                Your Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{requestData?.customer?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{requestData?.customer?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{requestData?.customer?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">
                    {formatDate(requestData?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiFileText className="text-orange-500 mr-2" />
              Submitted Documents by you ({customerUploadedDocs?.length})
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
                <div className="col-span-6 font-medium text-gray-700">
                  Document Name
                </div>
                <div className="col-span-3 font-medium text-gray-700">Type</div>
                <div className="col-span-2 font-medium text-gray-700">Size</div>
                <div className="col-span-1 font-medium text-gray-700">
                  Actions
                </div>
              </div>

              {customerUploadedDocs?.map((doc) => (
                <div
                  key={doc._id}
                  className="grid grid-cols-12 p-4 border-b border-gray-200 hover:bg-gray-50"
                >
                  <div className="col-span-6 flex items-center">
                    <FiFileText className="text-orange-500 mr-3" />
                    <span className="truncate">{doc.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-600">{doc.fileType}</div>
                  <div className="col-span-2 text-gray-600">
                    {formatFileSize(doc.fileSize)}
                  </div>
                  <div className="col-span-1 flex justify-end space-x-2">
                    <button
                      onClick={() => window.open(doc.fileUrl, "_blank")}
                      className="text-orange-600 hover:text-orange-700 p-1"
                      title="View Document"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() =>
                        window.open(doc.fileUrl, "_blank", "download")
                      }
                      className="text-gray-600 hover:text-gray-700 p-1"
                      title="Download"
                    >
                      <FiDownload />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiFileText className="text-orange-500 mr-2" />
              Documents Submitted Upon Task Completion. Final Documents (
              {finalDoc?.length})
            </h2>

            {!finalDoc?.length ? (
              <h2 className="font-thin text-xl text-gray-700">
                You will see your final documents here
              </h2>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
                  <div className="col-span-6 font-medium text-gray-700">
                    Document Name
                  </div>
                  <div className="col-span-3 font-medium text-gray-700">
                    Type
                  </div>
                  <div className="col-span-2 font-medium text-gray-700">
                    Size
                  </div>
                  <div className="col-span-1 font-medium text-gray-700">
                    Actions
                  </div>
                </div>

                {finalDoc?.map((doc) => (
                  <div
                    key={doc._id}
                    className="grid grid-cols-12 p-4 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <div className="col-span-6 flex items-center">
                      <FiFileText className="text-orange-500 mr-3" />
                      <span className="truncate">{doc.name}</span>
                    </div>
                    <div className="col-span-3 text-gray-600">
                      {doc.fileType}
                    </div>
                    <div className="col-span-2 text-gray-600">
                      {formatFileSize(doc.fileSize)}
                    </div>
                    <div className="col-span-1 flex justify-end space-x-2">
                      <button
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                        className="text-orange-600 hover:text-orange-700 p-1"
                        title="View Document"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() =>
                          window.open(doc.fileUrl, "_blank", "download")
                        }
                        className="text-gray-600 hover:text-gray-700 p-1"
                        title="Download"
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiClock className="text-orange-500 mr-2" />
              Request Timeline
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-200"></div>

              <div className="space-y-6">
                {requestData?.updates?.map((update, index) => (
                  <div key={update._id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-orange-500 border-4 border-orange-100"></div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">
                            {update.message}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(update.createdAt)}
                          </p>
                        </div>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
          <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Last updated: {formatDate(requestData?.updatedAt)}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center"
              >
                <FiPrinter className="mr-2" />
                Print Details
              </Button>
              <Button variant="outline" className="flex items-center">
                <FiShare2 className="mr-2" />
                Share Request
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 flex items-center">
                <FiCheckCircle className="mr-2" />
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

import React, { useEffect, useState } from "react";
import {
  FaFileUpload,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaCheckCircle,
  FaClock,
  FaComments,
  FaPaperclip,
  FaUserTie,
  FaBuilding,
  FaInfoCircle,
  FaHistory,
  FaRegCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaEllipsisV,
  FaTimesCircle,
  FaArrowLeft,
  FaRemoveFormat,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { Button, Container } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskServices";
import spinner from "/spinner.svg";
import toast from "react-hot-toast";
import extractErrorMessage from "../utils/extractErrorMessage";

const ProfessionalWork = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("documents");
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [documentRequest, setDocumentRequest] = useState("");
  const [showDocumentRequest, setShowDocumentRequest] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [toggleSetInProgressState, setToggleSetInProgressState] =
    useState(false);
  const { taskId } = useParams();
  const [loading, setLoading] = useState(true);
  const [inProgressLoading, setInProgressLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadFileLoading, setUploadFileLoading] = useState(false);

  const [deletingDocId, setDeletingDocId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    taskService
      .getProfessionalTaskById(taskId)
      .then((response) => {
        if (response.statusCode === 200) {
          setTaskData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [inProgressLoading, completeLoading, uploadFileLoading, deletingDocId]);

  const {
    customer,
    service,
    status,
    documents,
    updates,
    professional,
    customerRequirements,
    assignedAt,
    createdAt,
  } = taskData;

  const handleStatusChange = (newStatus) => {
    if (newStatus === "IN_PROGRESS") {
      setInProgressLoading(true);
    } else if (newStatus === "COMPLETED") {
      setCompleteLoading(true);
    }
    taskService
      .professionalUpdateTask(taskId, newStatus)
      .then((response) => {
        if (response.statusCode === 201) {
          toast.success("Status updated successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        extractErrorMessage(error);
        toast.error(extractErrorMessage(error));
        setChangeStatusLoading(false);
      })
      .finally(() => {
        setInProgressLoading(false);
        setCompleteLoading(false);
      });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleSubmitDocument = () => {
    setUploadFileLoading(true);
    setError("");

    const formData = new FormData();

    const data = {
      documents: uploadedFiles,
    };

    // Check if files exist and append them directly to formData
    if (data.documents && Array.isArray(data.documents)) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    // Append other fields
    Object.keys(data).forEach((key) => {
      if (key !== "documents") {
        formData.append(key, data[key]);
      }
    });

    taskService
      .professionalUploadFinalDocuments(taskId, formData)
      .then((response) => {
        if (response.statusCode === 201) {
          console.log("Upload response:", response);
          toast.success("Documents uploaded successfully!");
          setUploadedFiles([]);
          setUploadFileLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error uploading documents:", error);
        setUploadFileLoading(false);

        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setUploadFileLoading(false);
      });
  };

  // const handleCompleteWork = () => {
  //   onComplete({
  //     notes,
  //     files: uploadedFiles,
  //   });
  // };

  const handleRejectWork = () => {
    onReject(rejectionReason);
    setShowRejectModal(false);
  };

  const requestAdditionalDocuments = () => {
    if (documentRequest.trim()) {
      // In a real app, this would notify the client
      setDocumentRequest("");
      setShowDocumentRequest(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-red-500 text-xl" />;
    if (fileType.includes("image"))
      return <FaFileImage className="text-blue-500 text-xl" />;
    if (fileType.includes("word"))
      return <FaFileWord className="text-blue-600 text-xl" />;
    if (fileType.includes("excel") || fileType.includes("sheet"))
      return <FaFileExcel className="text-green-600 text-xl" />;
    return <FaFilePdf className="text-gray-500 text-xl" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleDeleteDocument = (documentId) => () => {
    setDeletingDocId(documentId);
    taskService
      .deleteDocument(documentId)
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success("Document deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setDeletingDocId(null);
      });
  };

  return (
    <Container>
      <div className="bg-white rounded-xl my-2 shadow-lg overflow-hidden h-full flex flex-col text-gray-800">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-800 hover:text-gray-900 pb-2"
              >
                <FaArrowLeft className="mr-2 " /> Go back
              </span>
              <h2 className="text-xl font-bold">{customer?.name}</h2>
              <div className="flex items-center mt-1 text-orange-100">
                <FaBuilding className="mr-2" />
                <span>{service?.name}</span>
              </div>
              <div className="text-sm mt-2">{service?.description}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm bg-white text-gray-700 bg-opacity-20 px-2 py-1 rounded mb-1">
                <FaRegCalendarAlt className="inline mr-1" />
                Assigned: {formatDate(assignedAt)}
              </span>
              {/* <span className="text-sm bg-white text-gray-700 bg-opacity-20 px-2 py-1 rounded">
                ID: {taskData?._id?.slice(-6).toUpperCase()}
              </span> */}
            </div>
          </div>
        </div>

        {/* Status Bar */}

        <div className="bg-orange-50 p-3 border-b border-orange-100">
          <p className="flex items-start p-3 mb-4 text-blue-800 bg-blue-100 rounded-lg shadow-sm">
            <FaInfoCircle className="w-5 h-5 mr-2 mt-1 text-blue-600" />
            Keep updating the task status to keep your customer informed and
            engaged! You can upload customer's final document after "Completed"
            status.
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-md text-sm flex items-center ${
                  status === "ASSIGNED"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaClock className="mr-1" /> Assigned
              </button>
              <button
                onClick={() => handleStatusChange("IN_PROGRESS")}
                className={`px-3 py-1 rounded-md text-sm flex items-center cursor-pointer min-w-8 ${
                  status === "IN_PROGRESS"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaClock className="mr-1" />{" "}
                {inProgressLoading ? (
                  <img src={spinner} className="h-4" />
                ) : (
                  "In Progress"
                )}
              </button>

              <button
                onClick={() => handleStatusChange("COMPLETED")}
                className={`px-3 py-1 rounded-md text-sm flex items-center cursor-pointer ${
                  status === "COMPLETED"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaCheckCircle className="mr-1" />{" "}
                {completeLoading ? (
                  <img src={spinner} className="h-4" />
                ) : (
                  "Completed"
                )}
              </button>
            </div>
            <div className="flex space-x-2">
              {status !== "REJECTED" && (
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center"
                >
                  <FaTimesCircle className="mr-1" /> Reject
                </button>
              )}
              <button
                // onClick={handleCompleteWork}
                className={`px-4 py-1 rounded-md text-sm flex items-center ${
                  status === "COMPLETED"
                    ? "bg-green-600 text-white"
                    : "bg-[#FF6F00] hover:bg-[#E65C00] text-white"
                }`}
              >
                <FaCheckCircle className="mr-1" />
                {status === "COMPLETED" ? "Work Submitted" : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Side - Work Area */}
          <div className="md:w-2/3 border-r border-gray-200 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-4 py-2 font-medium flex items-center ${
                  activeTab === "documents"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                <FaFilePdf className="mr-2" /> Documents
              </button>
              <button
                onClick={() => setActiveTab("requirements")}
                className={`px-4 py-2 font-medium flex items-center ${
                  activeTab === "requirements"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                <FaInfoCircle className="mr-2" /> Requirements
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 font-medium flex items-center ${
                  activeTab === "history"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                <FaHistory className="mr-2" /> History
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === "documents" && (
                <div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">
                        Client Documents (
                        {
                          documents?.filter(
                            (doc) => doc.uploadedByRole === "Customer"
                          )?.length
                        }
                        )
                      </h3>
                      <div className="relative w-64">
                        <input
                          type="text"
                          placeholder="Search documents..."
                          className="w-full pl-8 pr-4 py-2 border rounded-md"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                      </div>
                    </div>

                    {loading ? (
                      <img className="mx-auto" src={spinner} alt="Loading" />
                    ) : documents.filter(
                        (doc) => doc.uploadedByRole === "Customer"
                      )?.length > 0 ? (
                      <div className="space-y-3 mb-6">
                        {documents
                          .filter((doc) => doc.uploadedByRole === "Customer")
                          ?.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition duration-300"
                            >
                              {getFileIcon(doc?.fileType)}
                              <div className="flex-1 ml-4 overflow-hidden">
                                <p className="font-semibold text-gray-800 truncate">
                                  {doc?.name}
                                </p>
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>
                                    {doc?.fileType
                                      ?.split("/")[1]
                                      ?.toUpperCase()}{" "}
                                    • {formatFileSize(doc?.fileSize)}
                                  </span>
                                  <span>
                                    Uploaded {formatDate(doc?.createdAt)}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 ml-4">
                                {/* View Button */}
                                <a
                                  href={doc?.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
                                >
                                  View
                                </a>

                                {/* Download Button */}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No documents uploaded by client yet.
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">
                        Documents submitted by you to Client (
                        {
                          documents?.filter(
                            (doc) => doc.uploadedByRole === "Professional"
                          )?.length
                        }
                        )
                      </h3>
                    </div>

                    {loading ? (
                      <img className="mx-auto" src={spinner} alt="Loading" />
                    ) : documents?.filter(
                        (doc) => doc.uploadedByRole === "Professional"
                      )?.length > 0 ? (
                      <div className="space-y-3 mb-6">
                        {documents
                          .filter(
                            (doc) => doc.uploadedByRole === "Professional"
                          )
                          ?.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition duration-300"
                            >
                              {getFileIcon(doc?.fileType)}
                              <div className="flex-1 ml-4 overflow-hidden">
                                <p className="font-semibold text-gray-800 truncate">
                                  {doc?.name}
                                </p>
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>
                                    {doc?.fileType
                                      ?.split("/")[1]
                                      ?.toUpperCase()}{" "}
                                    • {formatFileSize(doc?.fileSize)}
                                  </span>
                                  <span>
                                    Uploaded {formatDate(doc?.createdAt)}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 ml-4">
                                {/* View Button */}
                                <a
                                  href={doc?.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
                                >
                                  View
                                </a>
                                <button
                                  onClick={handleDeleteDocument(doc?._id)}
                                >
                                  {deletingDocId === doc?._id ? (
                                    <img className="h-5" src={spinner} />
                                  ) : (
                                    <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer text-sm" />
                                  )}
                                </button>

                                {/* Download Button */}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No documents submitted by you to client yet.
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-lg">Your Work Files</h3>
                      {uploadedFiles?.length > 0 && (
                        <button
                          onClick={() => setUploadedFiles([])}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4 hover:border-[#FF6F00] transition-colors">
                      <label className="cursor-pointer flex flex-col items-center">
                        <FaFileUpload className="text-[#FF6F00] text-3xl mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, Images, Word, Excel (Max 10MB each)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>

                    {uploadedFiles?.length > 0 && (
                      <div className="space-y-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-gray-50 rounded-lg border hover:shadow"
                          >
                            {getFileIcon(file.type)}
                            <div className="flex-1 ml-3">
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {file.type.toUpperCase()} • {file.size}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const newFiles = [...uploadedFiles];
                                newFiles.splice(index, 1);
                                setUploadedFiles(newFiles);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={handleSubmitDocument}
                      disabled={uploadedFiles.length === 0}
                      className={`px-8 py-2.5 flex items-center justify-center ${
                        uploadedFiles.length === 0
                          ? "bg-orange-300 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700"
                      }`}
                    >
                      {uploadFileLoading && (
                        <img
                          className="mr-2 h-6 inline"
                          src={spinner}
                          alt="Loading"
                        />
                      )}{" "}
                      Submit documents
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div>
                  <h3 className="font-bold text-lg mb-3">
                    Customer Requirements
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="whitespace-pre-line">
                      {customerRequirements}
                    </p>
                  </div>

                  <h3 className="font-bold text-lg mb-3">Service Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Service Name
                        </h4>
                        <p>{service.name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Category
                        </h4>
                        <p>{service.category.name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Created At
                        </h4>
                        <p>{formatDate(createdAt)}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Assigned At
                        </h4>
                        <p>{formatDate(assignedAt)}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3">Required Documents</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Company PAN Card</li>
                      <li>Certificate of Incorporation</li>
                      <li>MOA & AOA</li>
                      <li>Board Resolution</li>
                      <li>Startup Business Plan</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Task History</h3>
                  <div className="space-y-4">
                    {updates.map((update, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              update.newStatus === "COMPLETED"
                                ? "bg-green-500"
                                : update.newStatus === "REJECTED"
                                ? "bg-red-500"
                                : "bg-[#FF6F00]"
                            }`}
                          ></div>
                          {index !== updates.length - 1 && (
                            <div className="w-px h-full bg-gray-300"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <p className="font-medium">
                                {update.message ||
                                  `Status changed to ${update.newStatus.replace(
                                    "_",
                                    " "
                                  )}`}
                              </p>
                              <span className="text-sm text-gray-500">
                                {formatDate(update.createdAt)}
                              </span>
                            </div>
                            {update.previousStatus && (
                              <div className="text-sm text-gray-600 mt-1">
                                Changed from{" "}
                                {update.previousStatus.replace("_", " ")} to{" "}
                                {update.newStatus.replace("_", " ")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Communication & Info */}
          <div className="md:w-1/3 flex flex-col border-l border-gray-200">
            {/* Customer Info */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Customer Information</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaUserTie className="text-gray-500 mr-2" />
                  <span>{customer?.name}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <span>{customer?.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <span>{customer?.phone}</span>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Assigned Professional</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaUserTie className="text-gray-500 mr-2" />
                  <span>{professional?.name}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <span>{professional?.email}</span>
                </div>
                <div className="flex items-center">
                  <FaInfoCircle className="text-gray-500 mr-2" />
                  <span>{professional?.specialization}</span>
                </div>
              </div>
            </div>

            {/* Work Notes */}
            {/* <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Work Notes</h3>
                <button
                  onClick={() => setShowDocumentRequest(true)}
                  className="text-sm text-[#FF6F00] hover:text-[#E65C00]"
                >
                  Request Documents
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mt-2 p-2 border rounded-md h-32 focus:ring-1 focus:ring-[#FF6F00]"
                placeholder="Add your private notes about this work..."
              />
              <div className="mt-2 text-xs text-gray-500">
                These notes are private and not visible to the client.
              </div>
            </div> */}

            {/* Communication */}
            {/* <div className="flex-1 overflow-auto p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Communication</h3>
              <div className="space-y-4">
                {updates?.map((update, index) => (
                  <div key={index} className="flex">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-full">
                      <p>
                        {update.message ||
                          `Status changed to ${update.newStatus.replace(
                            "_",
                            " "
                          )}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(update.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Message Input */}
            {/* <div className="p-3 bg-gray-50">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#FF6F00]"
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#FF6F00] text-white px-4 rounded-r-md hover:bg-[#E65C00] flex items-center"
                >
                  <RiSendPlaneFill className="text-xl" />
                </button>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Press Enter to send</span>
                <label className="cursor-pointer text-[#FF6F00] hover:text-[#E65C00]">
                  <FaPaperclip className="inline mr-1" />
                  Attach File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Reject Work Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-orange-600 mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reject Work
            </h3>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none h-32 mb-6 resize-none"
              placeholder="Please specify the reason for rejecting this work..."
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectWork}
                disabled={!rejectionReason.trim()}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  rejectionReason.trim()
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Documents Modal */}
      {showDocumentRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">
              Request Additional Documents
            </h3>
            <textarea
              value={documentRequest}
              onChange={(e) => setDocumentRequest(e.target.value)}
              className="w-full p-3 border rounded-md h-32 mb-4"
              placeholder="Specify which additional documents you need from the client..."
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDocumentRequest(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={requestAdditionalDocuments}
                disabled={!documentRequest.trim()}
                className={`px-4 py-2 rounded-md text-white ${
                  documentRequest.trim()
                    ? "bg-[#FF6F00] hover:bg-[#E65C00]"
                    : "bg-orange-300 cursor-not-allowed"
                }`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfessionalWork;

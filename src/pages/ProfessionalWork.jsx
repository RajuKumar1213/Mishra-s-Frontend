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
  FaTimesCircle,
  FaArrowLeft,
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
  const { taskId } = useParams();
  const [activeTab, setActiveTab] = useState("documents");
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [documentRequest, setDocumentRequest] = useState("");
  const [showDocumentRequest, setShowDocumentRequest] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [inProgressLoading, setInProgressLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
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
        }
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskId, inProgressLoading, completeLoading, uploadFileLoading, deletingDocId]);

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
        const message = extractErrorMessage(error);
        toast.error(message);
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
    if (uploadedFiles.length === 0) return;
    setUploadFileLoading(true);

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("documents", file);
    });

    taskService
      .professionalUploadFinalDocuments(taskId, formData)
      .then((response) => {
        if (response.statusCode === 201) {
          toast.success("Documents uploaded successfully!");
          setUploadedFiles([]);
        }
      })
      .catch((error) => {
        const message = extractErrorMessage(error);
        toast.error(message);
      })
      .finally(() => {
        setUploadFileLoading(false);
      });
  };

  const handleRejectWork = () => {
    if (!rejectionReason.trim()) return;
    taskService
      .professionalUpdateTask(taskId, "REJECTED", { rejectionReason })
      .then((response) => {
        if (response.statusCode === 201) {
          toast.success("Work rejected successfully");
          setShowRejectModal(false);
          setRejectionReason("");
        }
      })
      .catch((error) => {
        toast.error(extractErrorMessage(error));
      });
  };

  const requestAdditionalDocuments = () => {
    if (!documentRequest.trim()) return;
    taskService
      .requestDocuments(taskId, { documentRequest })
      .then((response) => {
        if (response.statusCode === 201) {
          toast.success("Document request sent!");
          setDocumentRequest("");
          setShowDocumentRequest(false);
        }
      })
      .catch((error) => {
        toast.error(extractErrorMessage(error));
      });
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes("pdf")) return <FaFilePdf className="text-red-500 text-lg" />;
    if (fileType?.includes("image")) return <FaFileImage className="text-blue-500 text-lg" />;
    if (fileType?.includes("word")) return <FaFileWord className="text-blue-600 text-lg" />;
    if (fileType?.includes("excel") || fileType?.includes("sheet"))
      return <FaFileExcel className="text-green-600 text-lg" />;
    return <FaFilePdf className="text-gray-500 text-lg" />;
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
    if (!bytes) return "Unknown";
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
        toast.error(extractErrorMessage(error));
      })
      .finally(() => {
        setDeletingDocId(null);
      });
  };

  return (
    <Container>
      <div className="bg-white rounded-2xl my-4 shadow-sm overflow-hidden flex flex-col text-gray-800 min-h-[calc(100vh-2rem)]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-3 sm:p-4 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-orange-100 hover:text-white transition-colors mb-1"
              >
                <FaArrowLeft className="mr-2" /> Back to Dashboard
              </button>
              <h2 className="text-xl sm:text-2xl font-bold">{customer?.name || "Client"}</h2>
              <div className="flex items-center text-orange-100">
                <FaBuilding className="mr-2" />
                <span className="text-sm sm:text-base">{service?.name || "Service"}</span>
              </div>
              <p className="text-xs sm:text-sm text-orange-200 max-w-md">{service?.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs sm:text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-lg">
                <FaRegCalendarAlt className="inline mr-1" />
                Assigned: {assignedAt ? formatDate(assignedAt) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-orange-50 p-3 sm:p-4 border-b border-orange-100">
          <p className="flex items-start p-3 mb-4 text-blue-800 bg-blue-100 rounded-lg shadow-sm text-xs sm:text-sm">
            <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 text-blue-600" />
            Keep your client in the loop by updating task status regularly! Upload final documents after marking as "Completed".
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {["ASSIGNED", "IN_PROGRESS", "COMPLETED"].map((s) => (
                <button
                  key={s}
                  onClick={() => s !== status && handleStatusChange(s)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center transition-colors ${
                    status === s
                      ? "bg-[#FF6F00] text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-orange-100"
                  }`}
                >
                  {s === "IN_PROGRESS" && inProgressLoading ? (
                    <img src={spinner} className="h-4 mr-1" alt="Loading" />
                  ) : s === "COMPLETED" && completeLoading ? (
                    <img src={spinner} className="h-4 mr-1" alt="Loading" />
                  ) : (
                    <FaClock className="mr-1" />
                  )}
                  {s === "ASSIGNED" ? "Assigned" : s === "IN_PROGRESS" ? "In Progress" : "Completed"}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              {status !== "REJECTED" && (
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-3 sm:px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs sm:text-sm hover:bg-red-700 flex items-center transition-colors"
                >
                  <FaTimesCircle className="mr-1" /> Reject
                </button>
              )}
              <button
                onClick={() => handleStatusChange("COMPLETED")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm flex items-center transition-colors ${
                  status === "COMPLETED"
                    ? "bg-green-600 text-white"
                    : "bg-[#FF6F00] text-white hover:bg-[#E65C00]"
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
          <div className="md:w-2/3 border-r border-gray-100 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
              {["documents", "requirements", "history"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm flex items-center transition-colors ${
                    activeTab === tab
                      ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                      : "text-gray-600 hover:text-[#FF6F00]"
                  }`}
                >
                  {tab === "documents" && <FaFilePdf className="mr-1" />}
                  {tab === "requirements" && <FaInfoCircle className="mr-1" />}
                  {tab === "history" && <FaHistory className="mr-1" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto p-3 sm:p-4">
              {activeTab === "documents" && (
                <div className="space-y-4">
                  {/* Client Documents */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold text-gray-800">Client Documents</h3>
                      <div className="relative w-40 sm:w-64">
                        <input
                          type="text"
                          placeholder="Search documents..."
                          className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                        <FaSearch className="absolute left-2 top-2.5 text-gray-400 text-sm" />
                      </div>
                    </div>
                    {loading ? (
                      <img className="mx-auto h-8" src={spinner} alt="Loading" />
                    ) : documents?.filter((doc) => doc.uploadedByRole === "Customer")?.length > 0 ? (
                      <div className="space-y-3">
                        {documents
                          .filter((doc) => doc.uploadedByRole === "Customer")
                          .map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                              {getFileIcon(doc?.fileType)}
                              <div className="flex-1 ml-3 overflow-hidden">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {doc?.name}
                                </p>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>
                                    {doc?.fileType?.split("/")[1]?.toUpperCase()} •{" "}
                                    {formatFileSize(doc?.fileSize)}
                                  </span>
                                  <span>{formatDate(doc?.createdAt)}</span>
                                </div>
                              </div>
                              <a
                                href={doc?.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                              >
                                View
                              </a>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 text-sm">
                        No documents uploaded by client yet.
                      </div>
                    )}
                  </div>

                  {/* Professional Documents */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        Your Submitted Documents
                      </h3>
                    </div>
                    {loading ? (
                      <img className="mx-auto h-8" src={spinner} alt="Loading" />
                    ) : documents?.filter((doc) => doc.uploadedByRole === "Professional")?.length > 0 ? (
                      <div className="space-y-3">
                        {documents
                          .filter((doc) => doc.uploadedByRole === "Professional")
                          .map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                              {getFileIcon(doc?.fileType)}
                              <div className="flex-1 ml-3 overflow-hidden">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {doc?.name}
                                </p>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>
                                    {doc?.fileType?.split("/")[1]?.toUpperCase()} •{" "}
                                    {formatFileSize(doc?.fileSize)}
                                  </span>
                                  <span>{formatDate(doc?.createdAt)}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <a
                                  href={doc?.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                  View
                                </a>
                                <button
                                  onClick={handleDeleteDocument(doc?._id)}
                                  disabled={deletingDocId === doc?._id}
                                >
                                  {deletingDocId === doc?._id ? (
                                    <img className="h-4" src={spinner} alt="Deleting" />
                                  ) : (
                                    <FaTrashAlt className="text-red-500 hover:text-red-700 text-sm" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500 text-sm">
                        No documents submitted by you yet.
                      </div>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold text-gray-800">Upload Work Files</h3>
                      {uploadedFiles?.length > 0 && (
                        <button
                          onClick={() => setUploadedFiles([])}
                          className="text-xs sm:text-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="border-2 border-dashed border-orange-200 rounded-lg p-4 text-center hover:border-[#FF6F00] hover:bg-orange-50/50 transition-all duration-200">
                      <label className="cursor-pointer flex flex-col items-center">
                        <FaFileUpload className="text-[#FF6F00] text-2xl sm:text-3xl mb-2" />
                        <p className="text-sm text-gray-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, Images, Word, Excel (Max 10MB each)</p>
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
                      <div className="space-y-2 mt-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center p-2 bg-orange-50 rounded-lg border border-orange-100 hover:shadow-sm transition-all duration-200"
                          >
                            {getFileIcon(file.type)}
                            <div className="flex-1 ml-2 truncate">
                              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {file.type.split("/")[1]?.toUpperCase()} • {formatFileSize(file.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                const newFiles = [...uploadedFiles];
                                newFiles.splice(index, 1);
                                setUploadedFiles(newFiles);
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex justify-end">
                      <Button
                        onClick={handleSubmitDocument}
                        disabled={uploadedFiles.length === 0 || uploadFileLoading}
                        className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                          uploadedFiles.length === 0 || uploadFileLoading
                            ? "bg-orange-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65C00] hover:to-[#E67C00] text-white"
                        }`}
                      >
                        {uploadFileLoading && <img className="mr-2 h-4" src={spinner} alt="Loading" />}
                        Submit Documents
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Customer Requirements</h3>
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {customerRequirements || "No specific requirements provided."}
                    </p>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">Service Details</h3>
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Service Name</h4>
                      <p className="text-sm text-gray-800">{service?.name || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Category</h4>
                      <p className="text-sm text-gray-800">{service?.category?.name || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Created At</h4>
                      <p className="text-sm text-gray-800">{createdAt ? formatDate(createdAt) : "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Assigned At</h4>
                      <p className="text-sm text-gray-800">{assignedAt ? formatDate(assignedAt) : "N/A"}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800">Required Documents</h3>
                  <div className="bg-orange-50 p-3 sm:p-4 rounded-lg shadow-sm">
                    <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
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
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Task History</h3>
                  {updates?.length > 0 ? (
                    <div className="space-y-3">
                      {updates.map((update, index) => (
                        <div key={index} className="flex">
                          <div className="flex flex-col items-center mr-3">
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${
                                update.newStatus === "COMPLETED"
                                  ? "bg-green-500"
                                  : update.newStatus === "REJECTED"
                                  ? "bg-red-500"
                                  : "bg-[#FF6F00]"
                              }`}
                            />
                            {index !== updates.length - 1 && (
                              <div className="w-px h-full bg-orange-200"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-3">
                            <div className="bg-orange-50 p-3 rounded-lg shadow-sm">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-gray-800">
                                  {update.message ||
                                    `Status changed to ${update.newStatus.replace("_", " ")}`}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {formatDate(update.createdAt)}
                                </span>
                              </div>
                              {update.previousStatus && (
                                <p className="text-xs text-gray-600 mt-1">
                                  Changed from {update.previousStatus.replace("_", " ")} to{" "}
                                  {update.newStatus.replace("_", " ")}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      No task history available.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Communication & Info */}
          <div className="md:w-1/3 flex flex-col border-l border-gray-100 bg-white">
            {/* Customer Info */}
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FaUserTie className="text-orange-500 mr-2" />
                  <span>{customer?.name || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-orange-500 mr-2" />
                  <span>{customer?.email || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-orange-500 mr-2" />
                  <span>{customer?.phone || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Assigned Professional</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FaUserTie className="text-orange-500 mr-2" />
                  <span>{professional?.name || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-orange-500 mr-2" />
                  <span>{professional?.email || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <FaInfoCircle className="text-orange-500 mr-2" />
                  <span>{professional?.specialization || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Work Notes */}
            <div className="p-3 sm:p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">Work Notes</h3>
                <button
                  onClick={() => setShowDocumentRequest(true)}
                  className="text-xs sm:text-sm text-[#FF6F00] hover:text-[#E65C00] transition-colors"
                >
                  Request Documents
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm h-24"
                placeholder="Add private notes about this work..."
              />
              <p className="text-xs text-gray-500 mt-1">Private notes, not visible to the client.</p>
            </div>

            {/* Communication */}
            <div className="flex-1 overflow-auto p-3 sm:p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Messages</h3>
              {updates?.filter((u) => u.message)?.length > 0 ? (
                <div className="space-y-3">
                  {updates
                    .filter((u) => u.message)
                    .map((update, index) => (
                      <div key={index} className="bg-orange-50 p-2 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-700">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(update.createdAt)}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">No messages yet.</div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-3 bg-orange-50">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && newMessage.trim() && handleSendMessage()}
                />
                <button
                  onClick={() => newMessage.trim() && handleSendMessage()}
                  className="bg-[#FF6F00] text-white px-3 sm:px-4 rounded-r-lg hover:bg-[#E65C00] flex items-center transition-colors"
                >
                  <RiSendPlaneFill className="text-lg" />
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
            </div>
          </div>
        </div>
      </div>

      {/* Reject Work Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-orange-600 mb-4 flex items-center">
              <FaTimesCircle className="mr-2 text-orange-500" />
              Reject Work
            </h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm h-28 resize-none"
              placeholder="Specify the reason for rejecting this work..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 sm:px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs sm:text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectWork}
                disabled={!rejectionReason.trim()}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm text-white transition-colors ${
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
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-orange-600 mb-4">Request Additional Documents</h3>
            <textarea
              value={documentRequest}
              onChange={(e) => setDocumentRequest(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm h-28 resize-none"
              placeholder="Specify which additional documents you need..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowDocumentRequest(false)}
                className="px-3 sm:px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs sm:text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={requestAdditionalDocuments}
                disabled={!documentRequest.trim()}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm text-white transition-colors ${
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

  function handleSendMessage() {
    // Placeholder for sending message logic
    toast.success("Message sent!");
    setNewMessage("");
  }
};

export default ProfessionalWork;
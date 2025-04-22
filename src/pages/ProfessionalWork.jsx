import React, { useState } from "react";
import {
  FaFileUpload,
  FaFilePdf,
  FaFileExcel,
  FaCheckCircle,
  FaClock,
  FaComments,
  FaPaperclip,
} from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { Container } from "../components";

const ProfessionalWork = ({ client, onComplete, onStatusChange }) => {
  const [activeTab, setActiveTab] = useState("documents");
  const [status, setStatus] = useState("In Progress");
  const [messages, setMessages] = useState([
    {
      sender: "client",
      text: "Please find attached all my financial documents for audit",
      time: "2 days ago",
      attachments: ["bank_statement.pdf"],
    },
    {
      sender: "you",
      text: "I've reviewed the documents. Need your FY2022-23 tax returns",
      time: "1 day ago",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notes, setNotes] = useState("");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "you", text: newMessage, time: "Just now" },
      ]);
      setNewMessage("");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([
      ...uploadedFiles,
      ...files.map((file) => ({
        name: file.name,
        type: file.type.split("/")[1] || "file",
        size: (file.size / 1024).toFixed(2) + " KB",
      })),
    ]);
  };

  const handleCompleteWork = () => {
    onComplete({
      notes,
      files: uploadedFiles,
      completionDate: new Date().toISOString(),
    });
  };

  return (
    <Container>
      <div className="bg-white rounded-xl my-2 shadow-lg overflow-hidden h-full flex flex-col text-gray-800">
        {/* Client Header */}
        <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{"Ravij"}</h2>
              <p className="text-orange-100">{""}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-white bg-opacity-20 text-gray-800 px-2 py-1 rounded">
                Deadline: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-orange-50 p-3 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange("In Progress")}
                className={`px-3 py-1 rounded-md text-sm ${
                  status === "In Progress"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaClock className="inline mr-1" /> In Progress
              </button>
              <button
                onClick={() => handleStatusChange("Review")}
                className={`px-3 py-1 rounded-md text-sm ${
                  status === "Review"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaComments className="inline mr-1" /> Client Review
              </button>
              <button
                onClick={() => handleStatusChange("Completed")}
                className={`px-3 py-1 rounded-md text-sm ${
                  status === "Completed"
                    ? "bg-[#FF6F00] text-white"
                    : "bg-white text-gray-700 border"
                }`}
              >
                <FaCheckCircle className="inline mr-1" /> Complete
              </button>
            </div>
            {status === "Completed" && (
              <button
                onClick={handleCompleteWork}
                className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Submit Final Work
              </button>
            )}
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
                className={`px-4 py-2 font-medium ${
                  activeTab === "documents"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab("forms")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "forms"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                Tax Forms
              </button>
              <button
                onClick={() => setActiveTab("calculator")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "calculator"
                    ? "text-[#FF6F00] border-b-2 border-[#FF6F00]"
                    : "text-gray-600"
                }`}
              >
                Calculator
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === "documents" && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Client Documents</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                      <FaFilePdf className="text-red-500 text-xl mr-3" />
                      <div className="flex-1">
                        <p className="font-medium">Bank Statements Q1 2023</p>
                        <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                      </div>
                      <button className="text-[#FF6F00] hover:text-[#E65C00]">
                        Download
                      </button>
                    </div>
                    {/* More documents... */}
                  </div>

                  <h3 className="font-bold text-lg mb-3">Your Work Files</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4">
                    <label className="cursor-pointer">
                      <FaFileUpload className="text-[#FF6F00] text-3xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-50 rounded-lg border"
                        >
                          {file.type === "pdf" ? (
                            <FaFilePdf className="text-red-500 text-xl mr-3" />
                          ) : (
                            <FaFileExcel className="text-green-500 text-xl mr-3" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {file.type.toUpperCase()} • {file.size}
                            </p>
                          </div>
                          <button className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "forms" && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Common Tax Forms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "ITR-1",
                      "ITR-2",
                      "ITR-3",
                      "ITR-4",
                      "GSTR-1",
                      "GSTR-3B",
                      "Form 16",
                      "Form 26AS",
                    ].map((form) => (
                      <button
                        key={form}
                        className="p-3 border border-gray-200 rounded-lg hover:border-[#FF6F00] hover:bg-orange-50 text-left"
                      >
                        <div className="flex items-center">
                          <FaFilePdf className="text-red-500 mr-2" />
                          <span>{form}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "calculator" && (
                <div>
                  <h3 className="font-bold text-lg mb-3">Tax Calculator</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Income
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deductions
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter amount"
                      />
                    </div>
                    <button className="bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#E65C00]">
                      Calculate Tax
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Communication */}
          <div className="md:w-1/3 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg">Work Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mt-2 p-2 border rounded-md h-32"
                placeholder="Add your private notes about this work..."
              />
            </div>

            <div className="flex-1 overflow-auto p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg mb-3">Communication</h3>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "you" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        msg.sender === "you"
                          ? "bg-[#FF6F00] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.attachments && (
                        <div className="mt-2">
                          {msg.attachments.map((file, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <FaPaperclip className="mr-1" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "you"
                            ? "text-orange-100"
                            : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-gray-50">
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
                  className="bg-[#FF6F00] text-white px-3 rounded-r-md hover:bg-[#E65C00]"
                >
                  <RiSendPlaneFill className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfessionalWork;

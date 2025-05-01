import React, { useEffect, useState } from "react";
import companyService from "../services/companyService";
import spinner from "/spinner.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function ViewAllAssigned({ viewAll, change }) {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(assignedTasks);

  useEffect(() => {
    companyService
      .getAllTasksAfterAssigned()
      .then((response) => {
        if (response.statusCode === 200) {
          setAssignedTasks(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching assigned tasks:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [change]);

  return (
    <div className="space-y-4">
      {loading ? (
        <img src={spinner} className="mx-auto" alt="...loading" />
      ) : viewAll ? (
        assignedTasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center justify-between md:p-4 p-2 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium">{task?.service?.name}</p>
              <p className="text-sm text-gray-700 flex items-center justify-between">
                <Link to={"/customer-details"}>
                  <img
                    className="h-6 w-6 rounded-full object-cover mr-2 cursor-pointer"
                    src={task?.customer?.profilePicture}
                  />
                </Link>{" "}
                {task?.customer?.name} →{" "}
                <Link>
                  <img
                    className="h-6 w-6 rounded-full object-cover mx-2 cursor-pointer"
                    src={task?.professional?.profilePicture}
                  />
                </Link>{" "}
                {task?.professional?.name}
              </p>
            </div>
            <div className="flex flex-row md:items-center justify-between md:justify-start">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    task?.status === "ASSIGNED"
                      ? "bg-yellow-200 text-yellow-900" // 🌟 Yellow, more urgent
                      : task?.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-900" // 🔵 Stronger blue
                      : task?.status === "COMPLETED"
                      ? "bg-emerald-200 text-emerald-900" // ✅ Rich emerald green (not basic green)
                      : "bg-slate-100 text-slate-800" // 🧹 Cleaner, modern gray
                  }

                  `}
              >
                {task?.status === "ASSIGNED"
                  ? "Assigned"
                  : task?.status === "IN_PROGRESS"
                  ? "In Progress"
                  : task?.status === "COMPLETED"
                  ? "Completed"
                  : task?.status === "DOCUMENT_UPLOADED"
                  ? "Document Uploaded"
                  : "New"}
              </span>
              <span className="ml-4 text-sm text-gray-500">
                {format(new Date(task?.assignedAt), "dd MMMM yyyy")}
              </span>
            </div>
          </div>
        ))
      ) : (
        assignedTasks?.slice(0, 3)?.map((task) => (
          <div
            key={task._id}
            className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center justify-between md:p-4 p-2 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium">{task?.service?.name}</p>
              <p className="text-sm text-gray-700 flex items-center justify-center">
                <img
                  className="h-6 w-6 rounded-full object-cover mr-2 cursor-pointer"
                  src={task?.customer?.profilePicture}
                />{" "}
                {task?.customer?.name} →{" "}
                <img
                  className="h-6 w-6 rounded-full object-cover mx-2 cursor-pointer"
                  src={task?.professional?.profilePicture}
                />{" "}
                {task?.professional?.name}
              </p>
            </div>
            <div className="flex md:items-center justify-between md:justify-start">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    task?.status === "ASSIGNED"
                      ? "bg-yellow-200 text-yellow-900" // 🌟 Yellow, more urgent
                      : task?.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-900" // 🔵 Stronger blue
                      : task?.status === "COMPLETED"
                      ? "bg-emerald-200 text-emerald-900" // ✅ Rich emerald green (not basic green)
                      : "bg-slate-100 text-slate-800" // 🧹 Cleaner, modern gray
                  }

                  `}
              >
                {task?.status === "ASSIGNED"
                  ? "Assigned"
                  : task?.status === "IN_PROGRESS"
                  ? "In Progress"
                  : task?.status === "COMPLETED"
                  ? "Completed"
                  : task?.status === "DOCUMENT_UPLOADED"
                  ? "Document Uploaded"
                  : "New"}
              </span>
              <span className="ml-4 text-sm text-gray-500">
                {format(new Date(task?.assignedAt), "dd MMMM yyyy")}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewAllAssigned;

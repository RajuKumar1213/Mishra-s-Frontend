import React, { useEffect, useState } from "react";
import companyService from "../services/companyService";
import spinner from "/spinner.svg";
import { format } from "date-fns";

function ViewAllAssigned({ viewAll, change }) {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium">{task?.service?.name}</p>
              <p className="text-sm text-gray-500">
                {task?.customer?.name} → {task?.professional?.name}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  task.status === "ASSIGNED"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {task.status}
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
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-medium">{task?.service?.name}</p>
              <p className="text-sm text-gray-500">
                {task?.customer?.name} → {task?.professional?.name}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  task.status === "ASSIGNED"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {task.status}
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

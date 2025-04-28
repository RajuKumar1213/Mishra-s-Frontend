import { format } from "date-fns";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ProfessionalAssignmentTask({ assignedCustomers }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Client
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Work Details
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Assign Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {assignedCustomers?.tasks?.map((customer) => (
          <tr key={customer._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img
                  className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center"
                  src={customer?.customerProfile}
                />

                <div className="ml-4 mr-6">
                  <div className="text-sm font-medium text-gray-900">
                    {customer?.customerName}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {customer?.serviceName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    customer?.status === "ASSIGNED"
                      ? "bg-yellow-200 text-yellow-900" // 🌟 Yellow, more urgent
                      : customer?.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-900" // 🔵 Stronger blue
                      : customer?.status === "COMPLETED"
                      ? "bg-emerald-200 text-emerald-900" // ✅ Rich emerald green (not basic green)
                      : "bg-slate-100 text-slate-800" // 🧹 Cleaner, modern gray
                  }

                  `}
              >
                {customer?.status === "ASSIGNED"
                  ? "New Assigned"
                  : customer?.status === "IN_PROGRESS"
                  ? "In Progress"
                  : customer?.status === "COMPLETED"
                  ? "Completed"
                  : "New"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {format(new Date(customer?.assignedAt), "dd/MM/yyyy")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link to={`/professional/work/${customer?._id}`}>
                <button
                  onClick={() => handleStartWork(customer?._id)}
                  className="bg-[#FF6F00] hover:bg-[#E65C00] text-white py-1 px-3 rounded-md text-sm transition-colors"
                >
                  {customer.status === "ASSIGNED" ? "Start Work" : "Continue"}
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProfessionalAssignmentTask;

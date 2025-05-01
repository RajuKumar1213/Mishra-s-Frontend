import { format } from "date-fns";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ProfessionalAssignmentTask({ assignedCustomers }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-orange-50">
          <tr>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Client
            </th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Task
            </th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
              Date
            </th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {assignedCustomers?.tasks?.map((customer) => (
            <tr key={customer._id} className="hover:bg-orange-50/50 transition-colors">
              <td className="px-3 sm:px-4 py-3 sm:py-4">
                <div className="flex items-center">
                  <img
                    className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                    src={customer?.customerProfile}
                    alt="Client profile"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                  <div className="ml-2 sm:ml-3 max-w-[100px] sm:max-w-[140px]">
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {customer?.customerName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 sm:px-4 py-3 sm:py-4">
                <div className="text-sm font-medium text-gray-800 truncate max-w-[90px] sm:max-w-[160px]">
                  {customer?.serviceName}
                </div>
                <div className="text-xs text-gray-500 md:hidden mt-1">
                  {format(new Date(customer?.assignedAt), "dd/MM/yy")}
                </div>
              </td>
              <td className="px-3 sm:px-4 py-3 sm:py-4">
                <span
                  className={`block w-full text-center px-2 py-1 text-xs font-medium rounded-lg ${
                    customer?.status === "ASSIGNED"
                      ? "bg-yellow-100 text-yellow-700"
                      : customer?.status === "IN_PROGRESS"
                      ? "bg-blue-100 text-blue-700"
                      : customer?.status === "COMPLETED"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {customer?.status === "ASSIGNED"
                    ? "Assigned"
                    : customer?.status === "IN_PROGRESS"
                    ? "In Progress"
                    : customer?.status === "COMPLETED"
                    ? "Completed"
                    : "New"}
                </span>
              </td>
              <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                {format(new Date(customer?.assignedAt), "dd/MM/yyyy")}
              </td>
              <td className="px-3 sm:px-4 py-3 sm:py-4">
                <Link to={`/professional/work/${customer?._id}`}>
                  <button
                    className="w-full sm:w-auto bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] hover:from-[#E65C00] hover:to-[#E67C00] text-white py-1.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
                  >
                    {customer.status === "ASSIGNED" ? "Start" : "Continue"}
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfessionalAssignmentTask;
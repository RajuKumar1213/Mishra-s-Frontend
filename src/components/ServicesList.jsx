import React from "react";
import ServicesDropdown from "./ServicesDropdown";

function ServicesList() {
  return (
    <div className="mt-4 sm:mt-6">
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-3 sm:p-4 bg-gray-50">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Browse Professional Services
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select a service to get started
            </p>
          </div>

          {/* Services List */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <ServicesDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;

import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiServiceLine } from "react-icons/ri";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.floor(rating) ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-yellow-400" />
      )
    );
  }
  return stars;
};

function CustomerTaskHistory() {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Service History
      </h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">
                Private Limited Company Registration
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Completed on March 28, 2023
              </p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="mt-3 flex items-center">
            <div className="flex mr-2">{renderStars(5)}</div>
            <span className="text-sm text-gray-500">Your rating: 5/5</span>
          </div>
          <div className="mt-3">
            <button className="text-sm text-[#FF6F00] hover:text-[#E65C00] flex items-center">
              <RiServiceLine className="mr-1" />
              View Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerTaskHistory;

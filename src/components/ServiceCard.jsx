import React from "react";
import { motion } from "framer-motion";
import { RiServiceLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -5, 
      scale: 1.02, 
      boxShadow: "0 8px 16px rgba(255, 111, 0, 0.2)",
      transition: { duration: 0.2 }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="p-3 sm:p-4 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50 cursor-pointer transition-all duration-200"
      onClick={() => navigate(`/services/${service?._id || "details"}`)}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="bg-orange-100 p-2 sm:p-3 rounded-full text-[#FF6F00] flex-shrink-0">
          <RiServiceLine className="text-xl sm:text-2xl" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 truncate max-w-[200px] sm:max-w-[300px]">
            {service?.name || "Unnamed Service"}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
            {service?.description || "No description available"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
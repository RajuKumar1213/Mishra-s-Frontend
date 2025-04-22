import React from "react";
import { motion } from "framer-motion";
import { RiServiceLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-4 border border-gray-200 rounded-xl hover:border-[#FF6F00] hover:shadow-md cursor-pointer transition-all"
      onClick={() => navigate("/services")}
    >
      <div className="flex items-center space-x-3">
        <div className="bg-[#FF6F00]/10 p-3 rounded-full text-[#FF6F00]">
          <RiServiceLine className="text-2xl" />
        </div>
        <div>
          <h4 className="font-medium">{service.name}</h4>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

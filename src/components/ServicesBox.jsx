import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ServicesBox({ services, activeCategory }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div>
      <AnimatePresence>
        {activeCategory === services.category && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <Link key={index} to={`request/service/${service._id}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedService(service.name)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#FF6F00]/50 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">
                        {service.name}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-1">{service.rating}</span>
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      {service.description}
                    </p>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-[#FF6F00]/10 text-[#FF6F00] rounded-full">
                        Popular
                      </span>
                      {/* <span className="text-sm font-medium text-[#FF6F00]">
                      Starting at ₹999
                    </span> */}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ServicesBox;

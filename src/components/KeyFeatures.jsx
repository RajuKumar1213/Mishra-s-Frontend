import React from "react";
import { motion } from "framer-motion";
import { FaUserCog, FaChartLine, FaTrophy } from "react-icons/fa";

const KeyFeatures = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardHover = {
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 20px rgba(255, 111, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      title: "State-wise CA/CS Login",
      desc: "Region-specific portals for CAs and CSs with secure, role-based access.",
      icon: <FaUserCog className="text-3xl sm:text-4xl text-orange-500" />,
    },
    {
      title: "Customer Progress Tracking",
      desc: "Real-time updates for customers to track their work at every stage.",
      icon: <FaChartLine className="text-3xl sm:text-4xl text-orange-500" />,
    },
    {
      title: "CA Ranking System",
      desc: "Smart ranking of CAs by performance for efficient task assignment.",
      icon: <FaTrophy className="text-3xl sm:text-4xl text-orange-500" />,
    },
  ];

  return (
    <motion.section
      className="bg-gradient-to-b from-white to-orange-50/50 py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 sm:mb-12"
          variants={fadeIn}
        >
          Why Choose Us
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
              variants={cardHover}
              whileHover="hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 sm:mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default KeyFeatures;
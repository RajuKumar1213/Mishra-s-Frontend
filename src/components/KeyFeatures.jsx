import React from "react";
import { motion } from "framer-motion";

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
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="bg-gradient-to-b from-[#FEFCE8] to-[#10B981]/10 py-12 px-4 md:px-6"
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h3
          className="text-4xl font-bold text-[#374151] mb-12 font-poppins"
          variants={fadeIn}
        >
          Key Features
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "State-wise CA/CS Login",
              desc: "Separate portals for every CA and CS based on their region. Role-specific access only.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#10B981] mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 0112zm-2-5H6v2h2v2h2v-2h2v-2h-2V7H8v4z" />
                </svg>
              ),
            },
            {
              title: "Customer Progress Tracking",
              desc: "Customers can view real-time status updates as their work progresses through various stages.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#10B981] mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm2 0v14h10V3H5zm2 2h6v2H7V5zm0 4h6v2H7V9zm0 4h4v2H7v-2z" />
                </svg>
              ),
            },
            {
              title: "CA Ranking System",
              desc: "Automatically rank CAs based on performance. Assign tasks intelligently and efficiently.",
              icon: (
                <svg
                  className="w-10 h-10 text-[#10B981] mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 0112zm0-8l3 3h-2v4H9v-4H7l3-3z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-[#10B981]/20 hover:border-[#F97316]/50 transition-all"
              variants={cardHover}
              whileHover="hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {feature.icon}
              <h4 className="text-xl font-semibold text-[#374151] mb-2 font-poppins">
                {feature.title}
              </h4>
              <p className="text-sm text-[#374151] font-inter">
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

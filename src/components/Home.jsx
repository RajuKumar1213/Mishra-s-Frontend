import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import KeyFeatures from "./KeyFeatures";

const Home = () => {
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
    <div className="bg-[#FEFCE8] min-h-screen flex flex-col relative overflow-hidden pt-4">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pattern-bg" />

      <Container width="max-w-7xl">
        {/* Hero Section */}
        <motion.section
          className="relative flex flex-col md:flex-row items-center justify-between px-8 py-24 max-w-7xl mx-auto gap-12 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-[#10B981]/20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {/* Text Content */}
          <div className="flex-1 z-10">
            <h2 className="text-6xl font-bold text-[#374151] mb-6 font-poppins drop-shadow-md">
              Simplify Your Financial Future
            </h2>
            <p className="text-xl text-[#374151] mb-8 font-inter max-w-lg">
              Partner with expert CAs and CSs for seamless tax filing,
              compliance, and wealth planning. Your success, our priority.
            </p>
            <div className="flex space-x-4">
              <a
                href="#customer-login"
                className="bg-gradient-to-r from-[#10B981] to-[#F97316] hover:from-[#0d8f6b] hover:to-[#e66914] text-white py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-poppins border border-[#F97316]/50"
              >
                Get Started
              </a>
              <a
                href="#consultation"
                className="border border-[#10B981] text-[#374151] py-3 px-8 rounded-xl hover:bg-[#10B981] hover:text-white transition-all font-poppins hover:shadow-md"
              >
                Free Consultation
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 z-10">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="CA/CS Collaboration"
              className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.section>

        {/* Service Highlights */}
        <motion.section
          className="px-8 py-20 max-w-7xl mx-auto"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#374151] mb-12 text-center font-poppins">
            Our Expertise, Your Peace of Mind
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tax Filing",
                desc: "Effortless income tax and GST filing with expert support.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm2 0v14h10V3H5zm2 2h6v2H7V5zm0 4h6v2H7V9zm0 4h4v2H7v-2z" />
                  </svg>
                ),
              },
              {
                title: "Compliance",
                desc: "Navigate company law and regulations with ease.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5H7v2h2v2h2v-2h2v-2h-2V7H9v4z" />
                  </svg>
                ),
              },
              {
                title: "Financial Planning",
                desc: "Tailored strategies to grow and protect your wealth.",
                icon: (
                  <svg
                    className="w-10 h-10 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-9h2v6h-2V7zm-4 0h2v6H7V7z" />
                  </svg>
                ),
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#10B981]/20 hover:border-[#F97316]/50 transition-all"
                variants={cardHover}
                whileHover="hover"
              >
                <div className="mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold text-[#374151] mb-2 font-poppins">
                  {service.title}
                </h4>
                <p className="text-[#374151] font-inter">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <KeyFeatures />

        {/* Testimonial Section */}
        <motion.section
          className="px-8 py-20 max-w-7xl mx-auto bg-gradient-to-b from-[#FEFCE8] to-[#10B981]/10 rounded-3xl"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-[#374151] mb-12 text-center font-poppins">
            Client Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Tax filing was never this easy. My CA was exceptional!",
                author: "Priya S., Entrepreneur",
              },
              {
                quote:
                  "Compliance made simple. This platform is a game-changer!",
                author: "Rahul M., Startup Founder",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#10B981]/20"
              >
                <svg
                  className="w-8 h-8 text-[#F97316] mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 4a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V6h1a1 1 0 000-2H7zm6 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V6h1a1 1 0 000-2h-3z" />
                </svg>
                <p className="text-[#374151] mb-4 font-inter italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-[#374151] font-semibold font-poppins">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Trust Badges */}
        <motion.section
          className="px-8 py-16 max-w-7xl mx-auto text-center"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold text-[#374151] mb-8 font-poppins">
            Trusted by Industry Leaders
          </h3>
          <div className="flex justify-center gap-12 flex-wrap">
            <img
              src="https://i.pinimg.com/474x/c3/a3/60/c3a36009d795d01062092e5459efd796.jpg"
              alt="ICAI Logo"
              className="h-12 opacity-70 hover:opacity-100 hover:scale-110 transition-all border border-[#10B981]/20 rounded-md"
            />
            <img
              src="https://i.pinimg.com/474x/c3/a3/60/c3a36009d795d01062092e5459efd796.jpg"
              alt="ICSI Logo"
              className="h-12 opacity-70 hover:opacity-100 hover:scale-110 transition-all border border-[#10B981]/20 rounded-md"
            />
          </div>
        </motion.section>
      </Container>
    </div>
  );
};

export default Home;

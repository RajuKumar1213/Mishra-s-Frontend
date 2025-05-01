import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "./Container";
import KeyFeatures from "./KeyFeatures";
import CompanyTopServices from "./CompanyTopServices ";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const heroVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const cardHover = {
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 20px rgba(255, 111, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        initial="initial"
        animate="animate"
        variants={heroVariants}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-0" />
        <img
          src="https://images.unsplash.com/photo-1664575602276-acd390ffa881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Modern Financial Workspace"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />

        {/* Hero Content */}
        <Container width="max-w-7xl" className="relative z-10 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Text Content */}
            <motion.div
              className="flex-1 text-white text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.3 },
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                <span className="block">Empower Your</span>
                <span className="text-orange-400">Financial Future</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 opacity-90">
                Connect with India's top CA & CS experts for seamless tax planning, compliance, and wealth growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 px-8 sm:px-10 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border-2 border-orange-400/50"
                >
                  Start Now
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-orange-400 hover:bg-orange-400/10 text-orange-400 py-3 sm:py-4 px-8 sm:px-10 rounded-xl font-semibold text-base sm:text-lg hover:shadow-md transition-all duration-200"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-6 lg:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.5 },
              }}
            >
              {[
                { value: "500+", label: "Expert Professionals" },
                { value: "10K+", label: "Happy Clients" },
                { value: "24/7", label: "Support Available" },
                { value: "99%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/20 hover:border-orange-400/50 transition-all text-center"
                  variants={cardHover}
                  whileHover="hover"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 15, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-orange-400 flex justify-center p-1">
            <motion.div
              className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-400 rounded-full"
              animate={{
                y: [0, 8, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Top Services Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <CompanyTopServices />
      </motion.section>

      {/* Key Features Section */}
      
        <KeyFeatures />
     

      {/* Testimonial Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-7xl" className="px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Loved by Businesses & Individuals
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
              Hear from our clients who trust us with their financial success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote: "Their tax strategies slashed our liabilities by 35%. World-class service!",
                author: "Rajesh K., Startup Founder",
                role: "Tech Startup",
                rating: 5,
              },
              {
                quote: "Company incorporation done in days with zero stress. Highly recommend!",
                author: "Priya M., Entrepreneur",
                role: "E-commerce Business",
                rating: 5,
              },
              {
                quote: "Ongoing support that feels like a true partnership. They’re the best!",
                author: "Amit S., CFO",
                role: "Manufacturing Company",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-xl border border-white/20 hover:border-orange-300 transition-all"
                variants={cardHover}
                whileHover="hover"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 sm:w-5 h-4 sm:h-5 text-orange-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg italic mb-4 sm:mb-6 text-orange-100">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-orange-200 text-sm sm:text-base">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-4xl" className="text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Transform Your Financial Future Today
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of clients who’ve unlocked their financial potential with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/get-started"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 px-8 sm:px-12 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started
            </Link>
            <a
              href="#consultation"
              className="bg-transparent border-2 border-orange-500 hover:bg-orange-500/10 text-orange-500 py-3 sm:py-4 px-8 sm:px-12 rounded-xl font-semibold text-base sm:text-lg hover:shadow-md transition-all duration-200"
            >
              Book a Consultation
            </a>
          </div>
        </Container>
      </motion.section>
    </div>
  );
};

export default Home;
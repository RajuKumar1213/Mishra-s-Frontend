import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import KeyFeatures from "./KeyFeatures";
import { Link } from "react-router-dom";
import CompanyTopServices from "./CompanyTopServices ";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardHover = {
    hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3 } },
  };

  const heroVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero Section with Full HD Background */}
      <motion.section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        initial="initial"
        animate="animate"
        variants={heroVariants}
      >
        {/* Full HD Background Image with overlay */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Financial Planning"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Hero Content */}
        <Container width="max-w-7xl" className="relative z-10 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Text Content */}
            <motion.div
              className="flex-1 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.3 },
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-left font-bold mb-4 sm:mb-6 leading-tight">
                <span className="block">Expert Financial</span>
                <span className="text-orange-400">Solutions</span> Tailored For
                You
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:text-left mb-6 sm:mb-8 max-w-2xl opacity-90 text-gray-800 font-bold">
                Partner with India's top CA & CS professionals for tax
                optimization, compliance excellence, and strategic wealth
                growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 px-8 sm:px-10 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-base sm:text-lg border-2 border-orange-400/50 text-center"
                >
                  Get Started Now
                </Link>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="flex-1 grid grid-cols-2 gap-3 sm:gap-6 mt-6 lg:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.6 },
              }}
            >
              {[
                { value: "500+", label: "Certified Professionals" },
                { value: "10K+", label: "Satisfied Clients" },
                { value: "24/7", label: "Expert Support" },
                { value: "99%", label: "Success Rate" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-black/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20 hover:border-orange-400/50 transition-all text-center"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 15, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-6 h-10 sm:w-8 sm:h-14 rounded-full border-2 border-orange-400 flex justify-center p-1">
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
      // company top services
      <CompanyTopServices />
      {/* Key Features */}
      <KeyFeatures />
      {/* Testimonial Section */}
      <motion.section
        className="py-10 sm:py-14 md:py-20 bg-orange-600 text-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-7xl" className="px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Trusted by Businesses & Individuals
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients say
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  "The tax planning strategies saved us over 30% in liabilities. Absolutely phenomenal service!",
                author: "Rajesh K., Startup Founder",
                role: "Tech Startup",
                rating: 5,
              },
              {
                quote:
                  "Our company incorporation was completed in record time with zero paperwork hassle.",
                author: "Priya M., Entrepreneur",
                role: "E-commerce Business",
                rating: 5,
              },
              {
                quote:
                  "Continuous support even after compliance work. Truly a partner in our growth journey.",
                author: "Amit S., CFO",
                role: "Manufacturing Company",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:border-orange-300 transition-all"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base sm:text-lg italic mb-4 sm:mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-orange-200 text-sm sm:text-base">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </motion.section>
      {/* CTA Section */}
      <motion.section
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-4xl" className="text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Financial Strategy?
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their
            financial success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/get-started"
              className="bg-white text-orange-600 hover:bg-gray-100 py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold text-base sm:text-lg"
            >
              Get Started Today
            </Link>
            <a
              href="#consultation"
              className="bg-transparent border-2 border-white hover:bg-white/10 py-3 sm:py-4 px-8 sm:px-12 rounded-xl transition-all font-bold text-base sm:text-lg hover:shadow-md"
            >
              Speak to an Expert
            </a>
          </div>
        </Container>
      </motion.section>
    </div>
  );
};

export default Home;

import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import KeyFeatures from "./KeyFeatures";
import { Link } from "react-router-dom";

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
        className="relative h-screen w-full flex items-center -top-4 md:top-0 justify-center overflow-hidden"
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
        <Container width="max-w-7xl" className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:px-6">
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
              <h1 className="text-4xl md:text-6xl lg:text-6xl text-center md:text-left font-bold mb-6 leading-tight">
                <span className="block">Expert Financial</span>
                <span className="text-orange-400">Solutions</span> Tailored For
                You
              </h1>
              <p className="text-lg md:text-2xl text-center md:text-left mb-8 max-w-2xl opacity-90 text-gray-800 font-bold">
                Partner with India's top CA & CS professionals for tax
                optimization, compliance excellence, and strategic wealth
                growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg border-2 border-orange-400/50 text-center md:text-left"
                >
                  Get Started Now
                </Link>
                {/* <a
                  href="#consultation"
                  className="bg-black/60 backdrop-blur-md border-2 border-white/30 text-white py-4 px-10 rounded-xl hover:bg-black/70 transition-all font-medium text-lg hover:shadow-md"
                >
                  Free Consultation
                </a> */}
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="flex-1 grid grid-cols-2 gap-6"
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
                  className="bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:border-orange-400/50 transition-all text-center md:text-left"
                >
                  <h3 className="text-3xl font-bold text-orange-400 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white/90">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 "
          animate={{
            y: [0, 15, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-8 h-14 rounded-full border-2 border-orange-400 flex justify-center p-1">
            <motion.div
              className="w-2 h-2 bg-orange-400 rounded-full"
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

      {/* Service Highlights */}
      <motion.section
        className="py-14 md:py-20 bg-gradient-to-b from-white to-orange-50"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-orange-600 max-w-2xl mx-auto">
              End-to-end financial solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1 md:px-6">
            {[
              {
                title: "Tax Planning & Filing",
                desc: "Strategic tax solutions that maximize your savings while ensuring full compliance.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
              {
                title: "GST Compliance",
                desc: "Complete GST registration, return filing, and advisory services for businesses.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
              {
                title: "Company Incorporation",
                desc: "Seamless registration for startups, private limited companies, and LLPs.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
              {
                title: "Audit & Assurance",
                desc: "Comprehensive audit services that ensure financial integrity and compliance.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
              {
                title: "Wealth Management",
                desc: "Personalized investment strategies to grow and protect your assets.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
              {
                title: "Legal Advisory",
                desc: "Expert guidance on corporate law, contracts, and regulatory compliance.",
                icon: (
                  <svg
                    className="w-12 h-12 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                ),
                color: "bg-orange-100",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className={`${service.color} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-orange-300`}
                variants={cardHover}
                whileHover="hover"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* Key Features */}
      <KeyFeatures />

      {/* Testimonial Section */}
      <motion.section
        className="py-14 md:py-20 bg-orange-600 text-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Businesses & Individuals
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 md:px-6">
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
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-orange-300 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-orange-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-orange-200">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Container width="max-w-4xl" className="text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Financial Strategy?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their
            financial success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/get-started"
              className="bg-white text-orange-600 hover:bg-gray-100 py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold text-lg"
            >
              Get Started Today
            </Link>
            <a
              href="#consultation"
              className="bg-transparent border-2 border-white hover:bg-white/10 py-4 px-12 rounded-xl transition-all font-bold text-lg hover:shadow-md"
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

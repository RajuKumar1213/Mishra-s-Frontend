import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("nav") && !event.target.closest("button")) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className="bg-slate-900 py-4 px-6 shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="hover:text-[#10B981] hover:scale-105 transition-all duration-300"
        >
          <h1 className="text-3xl font-bold text-[#D1D5DB] font-poppins">
            DropHeaven
          </h1>
        </Link>
        <motion.button
          className="md:hidden text-[#10B981] focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6 hover:text-[#F97316] transition-colors" />
          ) : (
            <FaBars className="w-6 h-6 hover:text-[#F97316] transition-colors" />
          )}
        </motion.button>
        <nav
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 fixed md:static top-16 right-0 w-full md:w-auto h-[calc(100vh-80px)] md:h-auto bg-[#1F2937] backdrop-blur-md md:bg-transparent transition-transform duration-300 ease-in-out md:flex md:items-center md:space-x-8`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 p-6 md:p-0">
            {[
              { to: "/professional-login", label: "CA/CS Login" },
              { to: "/customer-login", label: "Customer Login" },
              { to: "/company-login", label: "Company Login" },
            ].map((link, index) => (
              <motion.div
                key={link.to}
                variants={linkVariants}
                initial="initial"
                animate={
                  isMenuOpen || window.innerWidth >= 768 ? "animate" : "initial"
                }
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="py-2 px-4 text-[#D1D5DB] hover:text-white hover:underline rounded-md transition-all font-inter"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;

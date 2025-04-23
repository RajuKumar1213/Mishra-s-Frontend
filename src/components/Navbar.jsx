import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import professionalService from "../services/professionalService";
import toast from "react-hot-toast";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userRole = userData?.role;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  console.log(userData, authStatus);

  useEffect(() => {
    console.log(
      "🧠 Navbar re-rendered on authStatus or userData change",
      authStatus,
      userData
    );
  }, [authStatus, userData]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    professionalService.profLogout().then((res) => {
      if (res.statusCode == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        toast.success("Logged out successfully.");
        dispatch(logout());
        navigate("/");
        closeMenu();
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          closeMenu();
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Links for unauthenticated users
  const guestLinks = [
    { to: "/professional-login", label: "CA/CS Login" },
    { to: "/customer-login", label: "Customer Login" },
    { to: "/company-login", label: "Company Login" },
  ];

  // Links for authenticated users
  const authLinks = [
    {
      to:
        userRole === "Professional"
          ? "/professional-profile"
          : userRole === "Customer"
          ? "/customer-profile"
          : "/company-profile",
      label: "Profile",
    },
  ];

  return (
    <motion.header
      className="bg-slate-900/90 py-4 px-6 shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="hover:text-[#10B981] hover:scale-105 transition-all duration-300"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
            DropHeaven
          </h1>
        </Link>
        <motion.button
          ref={buttonRef}
          className="md:hidden text-[#10B981] focus:outline-none z-50"
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
          ref={menuRef}
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 fixed md:static inset-0 md:inset-auto top-16 right-0 w-full md:w-auto h-[calc(100vh-4rem)] md:h-auto bg-[#1F2937] md:bg-transparent transition-transform duration-300 ease-in-out md:flex md:items-center md:space-x-8 z-40`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 p-6 md:p-0">
            {authStatus ? (
              <>
                {/* Dashboard link */}
                <motion.div
                  variants={linkVariants}
                  initial="initial"
                  animate={
                    isMenuOpen || window.innerWidth >= 768
                      ? "animate"
                      : "initial"
                  }
                >
                  <Link
                    to={
                      userRole === "Professional"
                        ? "/professional/dashboard"
                        : userRole === "Customer"
                        ? "/customer-home"
                        : "/company/dashboard"
                    }
                    className="py-2 px-4 text-[#D1D5DB] hover:text-white hover:underline rounded-md transition-all font-inter"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </motion.div>

                {/* Other authenticated links */}
                {authLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    variants={linkVariants}
                    initial="initial"
                    animate={
                      isMenuOpen || window.innerWidth >= 768
                        ? "animate"
                        : "initial"
                    }
                    transition={{ delay: (index + 1) * 0.1 }}
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

                {/* Logout button */}
                <motion.div
                  variants={linkVariants}
                  initial="initial"
                  animate={
                    isMenuOpen || window.innerWidth >= 768
                      ? "animate"
                      : "initial"
                  }
                  transition={{ delay: (authLinks.length + 1) * 0.1 }}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-4 text-[#D1D5DB] hover:text-red-400 hover:underline rounded-md transition-all font-inter"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </motion.div>
              </>
            ) : (
              // Guest links
              guestLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={linkVariants}
                  initial="initial"
                  animate={
                    isMenuOpen || window.innerWidth >= 768
                      ? "animate"
                      : "initial"
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
              ))
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;

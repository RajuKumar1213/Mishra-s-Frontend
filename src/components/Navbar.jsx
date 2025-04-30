import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout, syncAuthState } from "../redux/features/authSlice";
import professionalService from "../services/professionalService";
import toast from "react-hot-toast";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Get auth state from Redux with force re-render on change
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userRole = userData?.role;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role");

    // If we have a stored token but Redux doesn't show as authenticated,
    // we could potentially restore the session here or handle inconsistencies

    if (accessToken && !authStatus) {
      console.log(
        "Found token in localStorage but Redux auth is false - syncing state"
      );
      // Here you would dispatch an action like:
      dispatch(syncAuthState({ token: accessToken, role: storedRole }));
    }
  }, [authStatus, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    professionalService
      .profLogout()
      .then((res) => {
        if (res.statusCode == 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("role");
          sessionStorage.removeItem("reloaded");
          toast.success("Logged out successfully.");
          dispatch(logout());
          navigate("/");
          closeMenu();
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Fallback logout in case API fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        dispatch(logout());
        navigate("/");
        toast.success("Logged out successfully.");
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
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const guestLinks = [
    {
      to: "/professional-login",
      label: "CA/CS Login",
      icon: <FaUser className="mr-2" />,
    },
    {
      to: "/customer-login",
      label: "Customer Login",
      icon: <FaUser className="mr-2" />,
    },
    {
      to: "/company-login",
      label: "Company Login",
      icon: <FaUser className="mr-2" />,
    },
  ];

  const authLinks = [
    {
      to:
        userRole === "Professional"
          ? "/professional-profile"
          : userRole === "Customer"
          ? "/customer-profile"
          : "/company-profile",
      label: "Profile",
      icon: <FaUser className="mr-2" />,
    },
  ];

  const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  // Determine dashboard link based on role - with fallback
  const dashboardLink =
    userRole === "Professional"
      ? "/professional/dashboard"
      : userRole === "Customer"
      ? "/customer-home"
      : userRole === "Company"
      ? "/company/dashboard"
      : "/";

  return (
    <motion.header
      className="bg-gray-900/95 py-4 px-6 shadow-xl sticky top-0 z-50 backdrop-blur-sm"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-poppins tracking-tight">
              DropHeaven
            </h1>
          </Link>
        </motion.div>

        <motion.button
          ref={buttonRef}
          className="md:hidden text-orange-400 focus:outline-none z-50 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {authStatus ? (
            <>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                className="relative"
              >
                <Link
                  to={dashboardLink}
                  className={`flex items-center py-2 px-3 text-gray-300 hover:text-orange-400 rounded-md transition-all font-medium ${
                    isActive(dashboardLink) ? "text-orange-400" : ""
                  }`}
                >
                  Dashboard
                  {isActive(dashboardLink) && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>

              {authLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    to={link.to}
                    className={`flex items-center py-2 px-3 text-gray-300 hover:text-orange-400 rounded-md transition-all font-medium ${
                      isActive(link.to) ? "text-orange-400" : ""
                    }`}
                  >
                    {link.icon}
                    {link.label}
                    {isActive(link.to) && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div whileHover="hover" whileTap="tap">
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 px-3 text-gray-300 hover:text-red-400 rounded-md transition-all font-medium"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </motion.div>
            </>
          ) : (
            guestLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover="hover"
                whileTap="tap"
                className="relative"
              >
                <Link
                  to={link.to}
                  className={`flex items-center py-2 px-3 text-gray-300 hover:text-orange-400 rounded-md transition-all font-medium ${
                    isActive(link.to) ? "text-orange-400" : ""
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {isActive(link.to) && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))
          )}
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              ref={menuRef}
              className="md:hidden fixed top-0 left-0 w-3/5 h-screen bg-gray-800 shadow-2xl z-40  py-6 px-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-poppins tracking-tight mb-10">
                DropHeaven
              </h1>
              <div className="flex flex-col space-y-4 ">
                {authStatus ? (
                  <>
                    <motion.div variants={linkVariants} className="relative">
                      <Link
                        to={dashboardLink}
                        className={`flex items-center py-3 px-4 text-gray-300 hover:text-orange-400 rounded-lg transition-all font-medium ${
                          isActive(dashboardLink)
                            ? "text-orange-400 bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={closeMenu}
                      >
                        Dashboard
                        {isActive(dashboardLink) && (
                          <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-full"></span>
                        )}
                      </Link>
                    </motion.div>

                    {authLinks.map((link, index) => (
                      <motion.div
                        key={link.to}
                        variants={linkVariants}
                        transition={{ delay: (index + 1) * 0.1 }}
                        className="relative"
                      >
                        <Link
                          to={link.to}
                          className={`flex items-center py-3 px-4 text-gray-300 hover:text-orange-400 rounded-lg transition-all font-medium ${
                            isActive(link.to)
                              ? "text-orange-400 bg-gray-700"
                              : "hover:bg-gray-700"
                          }`}
                          onClick={closeMenu}
                        >
                          {link.icon}
                          {link.label}
                          {isActive(link.to) && (
                            <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-full"></span>
                          )}
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      variants={linkVariants}
                      transition={{ delay: (authLinks.length + 1) * 0.1 }}
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-3 px-4 text-gray-300 hover:text-red-400 rounded-lg transition-all font-medium hover:bg-gray-700"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  guestLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      variants={linkVariants}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center py-3 px-4 text-gray-300 hover:text-orange-400 rounded-lg transition-all font-medium ${
                          isActive(link.to)
                            ? "text-orange-400 bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                        onClick={closeMenu}
                      >
                        {link.icon}
                        {link.label}
                        {isActive(link.to) && (
                          <span className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-full"></span>
                        )}
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Navbar;

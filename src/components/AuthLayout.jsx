import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import spinner from "/spinner.svg";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // If auth status hasn't been determined yet (null/undefined), keep loading
    if (authStatus === null || authStatus === undefined) {
      return;
    }

    // If authentication is required and user is not authenticated
    // if (authentication && !authStatus) {
    //   navigate("/");
    //   return;
    // }

    // If authentication is not required and user is authenticated
    // Redirect away from public routes (like login/signup) to dashboard
    if (!authentication && authStatus) {
      if (userData?.role === "Professional") {
        navigate("/professional/dashboard");
      } else if (userData?.role === "Customer") {
        navigate("/customer-home");
      } else if (userData?.role === "Company") {
        navigate("/company/dashboard");
      }
      return;
    }

    // Handle homepage redirect for authenticated users
    if (authStatus && location.pathname === "/") {
      if (userData?.role === "Professional") {
        navigate("/professional/dashboard");
      } else if (userData?.role === "Customer") {
        navigate("/customer-home");
      } else if (userData?.role === "Company") {
        navigate("/company/dashboard");
      }
      return;
    }

    // If all checks pass, show the content
    setLoader(false);
  }, [authentication, authStatus, userData, location.pathname, navigate]);

  return loader ? (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center text-xl text-gray-800 ">Loading...</h1>
      <img src={spinner} alt="Loading spinner" className="mt-4" />
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;

// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { Loader2 } from "lucide-react";

// /**
//  * Enhanced AuthLayout Component
//  *
//  * A production-grade authentication layout component that handles:
//  * - Route protection based on authentication status
//  * - Role-based redirects
//  * - Smooth loading transitions
//  * - Prevention of unnecessary redirects
//  * - Session persistence checks
//  */
// function AuthLayout({
//   children,
//   authentication = true,
//   requiredRoles = [],
//   fallbackPath = "/",
// }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const authStatus = useSelector((state) => state.auth.status);
//   const userData = useSelector((state) => state.auth.userData);
//   const [loading, setLoading] = useState(true);
//   const [authChecked, setAuthChecked] = useState(false);

//   // Get the appropriate dashboard route based on user role
//   const getDashboardRoute = useCallback(
//     (role) => {
//       const routeMap = {
//         Professional: "/professional/dashboard",
//         Customer: "/customer-home",
//         Company: "/company/dashboard",
//         Admin: "/admin/dashboard",
//       };

//       return routeMap[role] || fallbackPath;
//     },
//     [fallbackPath]
//   );

//   // Check if the user has the required role
//   const hasRequiredRole = useCallback(() => {
//     if (!requiredRoles.length) return true;
//     return requiredRoles.includes(userData?.role);
//   }, [requiredRoles, userData?.role]);

//   // Handle redirects based on authentication status and roles
//   useEffect(() => {
//     const handleAuth = async () => {
//       // Still waiting for auth status to be determined
//       if (authStatus === null || authStatus === undefined) {
//         return;
//       }

//       // Check for token expiration or session validity if needed
//       // This could involve an API call to validate the token

//       // Case 1: Auth required but user not authenticated
//       if (authentication && !authStatus) {
//         // Store the attempted URL to redirect back after login
//         sessionStorage.setItem("redirectAfterLogin", location.pathname);
//         navigate(fallbackPath, { state: { from: location.pathname } });
//         return;
//       }

//       // Case 2: Auth not required but user is authenticated (like login page)
//       if (!authentication && authStatus) {
//         const dashboardRoute = getDashboardRoute(userData?.role);
//         navigate(dashboardRoute);
//         return;
//       }

//       // Case 3: User is on homepage and authenticated
//       if (authStatus && location.pathname === "/") {
//         const dashboardRoute = getDashboardRoute(userData?.role);
//         navigate(dashboardRoute);
//         return;
//       }

//       // Case 4: User doesn't have required role for this route
//       if (authentication && authStatus && !hasRequiredRole()) {
//         const dashboardRoute = getDashboardRoute(userData?.role);
//         navigate(dashboardRoute, {
//           state: {
//             accessDenied: true,
//             message: "You don't have permission to access this page",
//           },
//         });
//         return;
//       }

//       // All checks passed, show content
//       setAuthChecked(true);

//       // Add small timeout to ensure smooth transition
//       setTimeout(() => {
//         setLoading(false);
//       }, 300);
//     };

//     handleAuth();
//   }, [
//     authentication,
//     authStatus,
//     userData,
//     location.pathname,
//     navigate,
//     getDashboardRoute,
//     hasRequiredRole,
//     fallbackPath,
//   ]);

//   // Loading animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//     exit: {
//       opacity: 0,
//       transition: { ease: "easeInOut" },
//     },
//   };

//   const childVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <motion.div
//         className="flex flex-col justify-center items-center fixed inset-0 bg-white dark:bg-gray-900 z-50"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <motion.div
//           variants={childVariants}
//           className="flex flex-col items-center"
//         >
//           <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
//           <motion.h2
//             variants={childVariants}
//             className="text-xl font-medium text-gray-700 dark:text-gray-200"
//           >
//             Preparing your experience...
//           </motion.h2>
//         </motion.div>
//       </motion.div>
//     );
//   }

//   // Render children with animation when ready
//   return (
//     <AnimatePresence mode="wait">
//       {authChecked && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="min-h-screen"
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default AuthLayout;

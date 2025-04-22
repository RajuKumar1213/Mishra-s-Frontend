import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // If auth status hasn't been determined yet (null/undefined), keep loading
    if (authStatus === null || authStatus === undefined) {
    }

    // If authentication is required and user is not authenticated
    if (authentication && !authStatus) {
      return;
    }

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
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-center text-xl">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;

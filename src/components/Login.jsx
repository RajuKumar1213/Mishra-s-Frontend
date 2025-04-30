import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role == "Professional") {
      navigate("/professional/dashboard");
    } else if (role == "Customer") {
      navigate("/customer-home");
    } else if (role == "Company") {
      navigate("/company/dashboard");
    }
    // else stay on login page
  }, []);

  return (
    <div>
      {/* Login form goes here */}
      <h2>Login Page</h2>
    </div>
  );
};

export default Login;

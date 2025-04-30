import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetStartedPage from "../pages/GetStartedPage";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log(role);

    // else stay on login page
  }, []);

  return (
    <div>
      {/* Login form goes here */}
      <GetStartedPage />
    </div>
  );
};

export default Login;

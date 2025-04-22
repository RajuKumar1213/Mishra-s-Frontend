import { useEffect, useState } from "react";
import { login, logout } from "./redux/features/authSlice";
import { Outlet } from "react-router-dom";
import { Container, Footer, Navbar } from "./components";
import { Toaster } from "react-hot-toast";
import spinner from "/spinner.svg";
import { useDispatch, useSelector } from "react-redux";

import professionalService from "./services/professionalService";
import customerService from "./services/customerService";
import companyService from "./services/companyService";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.authState);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (accessToken && role) {
      if (role === "Professional") {
        professionalService.getProfDetails().then((response) => {
          console.log(response);
          if (response.statusCode === 200) {
            dispatch(login(response.data));
            setLoading(false);
          }
        });
      } else if (role === "Customer") {
        customerService.getCustomerDetails().then((response) => {
          if (response.statusCode === 200) {
            dispatch(login(response.data));
            setLoading(false);
          }
        });
      } else if (role === "Company") {
        companyService.getCompanyDetails().then((response) => {
          if (response.statusCode === 200) {
            dispatch(login(response.data));
            setLoading(false);
          }
        });
      }
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen box-border text-white">
      <Navbar key={`${authState}-${userData?.role}`} />
      <Toaster position="top-right" />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <img
      src={spinner}
      alt="Loading..."
      className="w-14 mx-auto my-auto h-screen"
    />
  );
}

export default App;

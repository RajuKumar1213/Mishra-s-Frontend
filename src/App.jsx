import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import spinner from "/spinner.svg";
import { Container, Footer, Navbar } from "./components";

function App() {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const authenticated = localStorage.getItem("accessToken");

  //   if (authenticated) {
  //     authService
  //       .getCurrentUser()
  //       .then((userData) => {
  //         if (userData) {
  //           dispatch(login(userData.data));
  //         } else {
  //           dispatch(logout());
  //         }
  //       })
  //       .finally(() => setLoading(false));
  //   } else {
  //     dispatch(logout());
  //     setLoading(false);
  //   }
  // }, []);

  return !loading ? (
    <div className="min-h-screen box-border text-white ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <img src={spinner} alt="" className="w-14 mx-auto my-auto h-screen" />
  );
}
export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {
  HeroPage,
  CaCsSignupPage,
  ServicesPage,
  CompanyLoginPage,
} from "../pages";
import CustomerLoginPage from "../pages/CustomerLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/professional-login",
        element: <CaCsSignupPage />,
      },
      {
        path: "customer-login",
        element: <CustomerLoginPage />,
      },
      {
        path: "services",
        element: <ServicesPage />, // Redirect here after OTP verification
      },
      {
        path: "company-login",
        element: <CompanyLoginPage />, // Redirect here after OTP verification
      },
    ],
  },
]);

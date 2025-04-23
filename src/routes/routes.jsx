import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import {
  HeroPage,
  CaCsSignupPage,
  CompanyLoginPage,
  CacsPannelPage,
  ProfessionalFillDetailsPage,
  ProfessionalProfilePage,
  ProfessionalWork,
  CustomerFillDetailsPage,
  CustomerHome,
  CustomerProfile,
  CompanyDashboard,
  CompanyFillDetails,
  CompanyProfile,
} from "../pages";
import CustomerLoginPage from "../pages/CustomerLoginPage";
import { AuthLayout } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      // customer route here
      {
        path: "/customer-login",
        element: (
          <AuthLayout authentication={false}>
            <CustomerLoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/customer-fill-details",
        element: (
          <AuthLayout>
            <CustomerFillDetailsPage />
          </AuthLayout>
        ),
      },

      // professional route here
      {
        path: "/professional-login",
        element: (
          <AuthLayout authentication={false}>
            <CaCsSignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/customer-home",
        element: (
          <AuthLayout>
            <CustomerHome />
          </AuthLayout>
        ),
      },
      {
        path: "/customer-profile",
        element: (
          <AuthLayout>
            <CustomerProfile />
          </AuthLayout>
        ),
      },

      {
        path: "/professional/:username",
        element: (
          <AuthLayout>
            <CacsPannelPage />
          </AuthLayout>
        ),
      },
      {
        path: "/professional-fill-details",
        element: (
          <AuthLayout>
            <ProfessionalFillDetailsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/professional-panel",
        element: (
          <AuthLayout>
            <CacsPannelPage />
          </AuthLayout>
        ),
      },
      {
        path: "/professional-profile",
        element: (
          <AuthLayout>
            <ProfessionalProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "/professional/work/:customerId",
        element: (
          <AuthLayout>
            <ProfessionalWork />
          </AuthLayout>
        ),
      },

      // company route here
      {
        path: "/company-login",
        element: (
          <AuthLayout authentication={false}>
            <CompanyLoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/company/dashboard",
        element: (
          <AuthLayout>
            <CompanyDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/company-fill-details",
        element: (
          <AuthLayout>
            <CompanyFillDetails />
          </AuthLayout>
        ),
      },
      {
        path: "/company-profile",
        element: (
          <AuthLayout>
            <CompanyProfile />
          </AuthLayout>
        ),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import CustomerLoginPage from "../pages/CustomerLoginPage";
import { AuthLayout } from "../components";
import PageLoader from "../components/PageLoader"; // make sure this exists!

// Lazy Load Pages
const HeroPage = lazy(() => import("../pages/HeroPage"));
const CaCsSignupPage = lazy(() => import("../pages/CaCsSignupPage"));
const CompanyLoginPage = lazy(() => import("../pages/CompanyLoginPage"));
const CacsPannelPage = lazy(() => import("../pages/CacsPannelPage"));
const ProfessionalFillDetailsPage = lazy(() =>
  import("../pages/CompanyFillDetails")
);
const ProfessionalProfilePage = lazy(() =>
  import("../pages/ProfessionalProfilePage")
);
const ProfessionalWork = lazy(() => import("../pages/ProfessionalWork"));
const CustomerFillDetailsPage = lazy(() =>
  import("../pages/CustomerFillDetails")
);
const CustomerHome = lazy(() => import("../pages/CustomerHome"));
const CustomerProfile = lazy(() => import("../pages/CustomerProfile"));
const CompanyDashboard = lazy(() => import("../pages/CompanyDashboard"));
const CompanyFillDetails = lazy(() => import("../pages/CompanyFillDetails"));
const CompanyProfile = lazy(() => import("../pages/CompanyProfile"));
const RequestService = lazy(() => import("../pages/RequestService"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const GetStartedPage = lazy(() => import("../pages/GetStartedPage"));

// Suspense Wrapper
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: withSuspense(NotFoundPage),
    children: [
      { path: "/", element: withSuspense(HeroPage) },
      { path: "/get-started", element: withSuspense(GetStartedPage) },

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
          <AuthLayout>{withSuspense(CustomerFillDetailsPage)}</AuthLayout>
        ),
      },
      {
        path: "/customer-home",
        element: <AuthLayout>{withSuspense(CustomerHome)}</AuthLayout>,
      },
      {
        path: "/customer-profile",
        element: <AuthLayout>{withSuspense(CustomerProfile)}</AuthLayout>,
      },
      {
        path: "/request/service/:serviceId",
        element: <AuthLayout>{withSuspense(RequestService)}</AuthLayout>,
      },

      // professional route here
      {
        path: "/professional-login",
        element: (
          <AuthLayout authentication={false}>
            {withSuspense(CaCsSignupPage)}
          </AuthLayout>
        ),
      },
      {
        path: "/professional/:username",
        element: <AuthLayout>{withSuspense(CacsPannelPage)}</AuthLayout>,
      },
      {
        path: "/professional-fill-details",
        element: (
          <AuthLayout>{withSuspense(ProfessionalFillDetailsPage)}</AuthLayout>
        ),
      },
      {
        path: "/professional-panel",
        element: <AuthLayout>{withSuspense(CacsPannelPage)}</AuthLayout>,
      },
      {
        path: "/professional-profile",
        element: (
          <AuthLayout>{withSuspense(ProfessionalProfilePage)}</AuthLayout>
        ),
      },
      {
        path: "/professional/work/:customerId",
        element: <AuthLayout>{withSuspense(ProfessionalWork)}</AuthLayout>,
      },

      // company route here
      {
        path: "/company-login",
        element: (
          <AuthLayout authentication={false}>
            {withSuspense(CompanyLoginPage)}
          </AuthLayout>
        ),
      },
      {
        path: "/company/dashboard",
        element: <AuthLayout>{withSuspense(CompanyDashboard)}</AuthLayout>,
      },
      {
        path: "/company-fill-details",
        element: <AuthLayout>{withSuspense(CompanyFillDetails)}</AuthLayout>,
      },
      {
        path: "/company-profile",
        element: <AuthLayout>{withSuspense(CompanyProfile)}</AuthLayout>,
      },
    ],
  },
]);

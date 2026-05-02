import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoadingScreen from "./components/common/LoadingScreen";
import AdminLayout from "./components/layout/AdminLayout";
import PublicLayout from "./components/layout/PublicLayout";
import PrivateRoute from "./routes/PrivateRoute";

const HomePage = lazy(() => import("./pages/public/HomePage"));
const ServicesPage = lazy(() => import("./pages/public/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/public/ServiceDetailPage"));
const AboutPage = lazy(() => import("./pages/public/AboutPage"));
const CaseStudiesPage = lazy(() => import("./pages/public/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/public/CaseStudyDetailPage"));
const BlogPage = lazy(() => import("./pages/public/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/public/BlogDetailPage"));
const CareersPage = lazy(() => import("./pages/public/CareersPage"));
const ContactPage = lazy(() => import("./pages/public/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/public/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/public/TermsAndConditionsPage"));
const AuthPage = lazy(() => import("./pages/public/AuthPage"));
const CoursesPage = lazy(() => import("./pages/public/CoursesPage"));
const CourseDetailPage = lazy(() => import("./pages/public/CourseDetailPage"));
const DashboardPage = lazy(() => import("./pages/public/DashboardPage"));
const NotFoundPage = lazy(() => import("./pages/public/NotFoundPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminCollectionPage = lazy(() => import("./pages/admin/AdminCollectionPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage"));
const AdminInboxPage = lazy(() => import("./pages/admin/AdminInboxPage"));
const AdminApplicationsPage = lazy(() => import("./pages/admin/AdminApplicationsPage"));
const LearnerPrivateRoute = lazy(() => import("./routes/LearnerPrivateRoute"));

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

const AppShell = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={<LoadingScreen fullScreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route
            path="dashboard"
            element={
              <LearnerPrivateRoute>
                <DashboardPage />
              </LearnerPrivateRoute>
            }
          />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<AdminDashboardPage />} />
          <Route path="content/:type" element={<AdminCollectionPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="inquiries" element={<AdminInboxPage />} />
          <Route path="applications" element={<AdminApplicationsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
);

export default AppShell;

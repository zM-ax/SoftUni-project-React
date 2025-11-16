import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TestimonialsPage from "../pages/TestimonialsPage/TestimonialsPage";
import DIYPage from "../pages/DIYPage/DIYPage";
import MainLayout from "../components/MainLayout";
import AuthLayout from "../components/AuthLayout";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegistrationPage/RegistrationPage";
import ForgottenPasswordPage from "../pages/Authentication/ForgottenPasswordPage/ForgottenPasswordPage";

const AppRoutes = () => (
  <Routes>
    {/* Home with hero background */}
    <Route element={<MainLayout variant="home" />}>
      <Route index element={<HomePage />} />
    </Route>

    {/* Other pages with default background */}
    <Route element={<MainLayout variant="default" />}>
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/diy" element={<DIYPage />} />
    </Route>

    {/* Auth layout */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;

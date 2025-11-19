import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import DesertsPage from "../pages/TestimonialsPage/DesertsPage";
import DIYPage from "../pages/DIYPage/DIYPage";
import MainLayout from "../components/MainLayout";
import AuthLayout from "../components/AuthLayout";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegistrationPage/RegistrationPage";
import ForgottenPasswordPage from "../pages/Authentication/ForgottenPasswordPage/ForgottenPasswordPage";
import ContactsPage from "../pages/Contacts/ContactsPage";
import FAQPage from "../pages/FAQ/FAQPage";
import CartPage from "../pages/Cart/CartPage";
import ProfileRoute from "../pages/profileRoute/ProfileRoute";

const AppRoutes = () => (
  <Routes>
    {/* Home with hero background */}
    <Route element={<MainLayout variant="home" />}>
      <Route index element={<HomePage />} />
    </Route>

    {/* Other pages with default background */}
    <Route element={<MainLayout variant="default" />}>
      <Route path="/deserts" element={<DesertsPage />} />
      <Route path="/diy" element={<DIYPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfileRoute />} />
    </Route>

    {/* Authentication layout */}
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

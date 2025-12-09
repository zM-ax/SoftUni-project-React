import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProductsPage from "../pages/Products/ProductsPage";
import DIYPage from "../pages/DIY/DIYPage";
import MainLayout from "../components/MainLayout";
import AuthLayout from "../components/AuthLayout";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegistrationPage/RegistrationPage";
import ForgottenPasswordPage from "../pages/Authentication/ForgottenPasswordPage/ForgottenPasswordPage";
import ContactsPage from "../pages/Contacts/ContactsPage";
import FAQPage from "../pages/FAQ/FAQPage";
import CartPage from "../pages/Cart/CartPage";
import ProfileRoute from "../pages/profileRoute/ProfileRoute";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import OrderDetailsPage from "../pages/OrderDetails/OrderDetailsPage";
import AdminRouteGuard from "./AdminRouteGuard";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboardPage from "../pages/Admin/Dashboard/AdminDashboardPage";
import AdminProductsPage from "../pages/Admin/Products/AdminProductsPage";
import AdminOrdersPage from "../pages/Admin/Orders/AdminOrdersPage";
import AdminInquiriesPage from "../pages/Admin/Inquiries/AdminInquiriesPage";
import AdminCreateProductPage from "../pages/Admin/Products/AdminCreateProductPage";
import AdminEditProductPage from "../pages/Admin/Products/AdminEditProductPage";


const AppRoutes = () => (
  <Routes>
    {/* Home with hero background */}
    <Route element={<MainLayout variant="home" />}>
      <Route index element={<HomePage />} />
    </Route>

    {/* Other pages with default background */}
    <Route element={<MainLayout variant="default" />}>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/diy" element={<DIYPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfileRoute />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/my-orders/:orderId" element={<OrderDetailsPage />} />
    </Route>

    {/* Admin routes – layout protected by AdminRouteGuard */}
    <Route element={<AdminRouteGuard />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products/new" element={<AdminCreateProductPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="inquiries" element={<AdminInquiriesPage />} />
        <Route path="products/:productId/edit" element={<AdminEditProductPage />} /> 
      </Route>
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

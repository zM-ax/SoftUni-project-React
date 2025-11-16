import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../pages/Authentication/RegistrationPage/RegistrationPage'; 
import ForgottenPasswordPage from '../pages/Authentication/ForgottenPasswordPage/ForgottenPasswordPage';
import TestimonialsPage from '../pages/TestimonialsPage/TestimonialsPage';
import DIYPage from '../pages/DIYPage/DIYPage'; 
import LoginPage from '../pages/Authentication/LoginPage/LoginPage';

const AppRoutes = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
    <Route path="/testimonials" element={<TestimonialsPage />} />
    <Route path="/diy" element={<DIYPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;

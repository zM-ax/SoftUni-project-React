import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgottenPasswordPage from '../pages/ForgottenPasswordPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import DIYPage from '../pages/DIYPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
    <Route path="/testimonials" element={<TestimonialsPage />} />
    <Route path="/diy" element={<DIYPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;

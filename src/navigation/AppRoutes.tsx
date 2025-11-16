import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ForgottenPasswordPage from '../pages/ForgottenPasswordPage/ForgottenPasswordPage';
import TestimonialsPage from '../pages/TestimonialsPage/TestimonialsPage';
import DIYPage from '../pages/DIYPage/DIYPage';

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

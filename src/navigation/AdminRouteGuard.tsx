import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const AdminRouteGuard: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRouteGuard;

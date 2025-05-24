import React from "react";
import { useAuth } from "../Redux/authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

function ProtectedForPayment() {
  let { loginUser } = useAuth();
  const location = useLocation();

  if (!loginUser) {
    localStorage.setItem("redirectUrl", JSON.stringify(location.pathname));
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedForPayment;

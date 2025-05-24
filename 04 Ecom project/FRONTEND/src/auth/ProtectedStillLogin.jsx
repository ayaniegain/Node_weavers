import React from "react";
import { useAuth } from "../Redux/authSlice";
import { Navigate, Outlet } from "react-router";

function ProtectedStillLogin() {
  let { loginUser } = useAuth();

  if (loginUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedStillLogin;

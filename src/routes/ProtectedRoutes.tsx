import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth.isAuthenticated ? <Outlet></Outlet> : <Navigate to="/" />;
};

export default ProtectedRoutes;

import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { token, role } = getAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

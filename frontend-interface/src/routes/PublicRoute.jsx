import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAut123h->", isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

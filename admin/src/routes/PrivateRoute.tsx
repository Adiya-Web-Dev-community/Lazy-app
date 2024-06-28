import React from "react";

import { Navigate } from "react-router";
import Layout from "../layout/Layout";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("admin");
  // const isAuthenticated = "approvedUser";
  return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoute;

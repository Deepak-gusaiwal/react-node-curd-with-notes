import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const Protected = () => {
  const { loggedIn, status, statusVal } = useSelector((state) => state.auth);

  if (status === statusVal.idle || status === statusVal.loading) return;
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;

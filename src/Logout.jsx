/*eslint-disable*/
import React from "react";
import { Navigate } from "react-router-dom";
const Logout = () => {
  localStorage.removeItem("AdminCredentials");
  return (
    <div>
      <Navigate to="/authentication/sign-in" />
    </div>
  );
};

export default Logout;

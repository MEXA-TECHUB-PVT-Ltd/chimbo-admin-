/*eslint-disable*/
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

const AdminRoutesAuth = () => {
  const [data, setData] = useState("");
  console.log(typeof data);
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    getRole();
  }, []);
  const getRole = () => {
    const adminDetails = JSON.parse(localStorage.getItem("AdminCredentials"));

    if (adminDetails === null || adminDetails === undefined) {
      navigate("/authentication/sign-in");
    } else {
      setData(adminDetails);
    }
  };

  return typeof data === "object" && <Outlet />;
};

export default AdminRoutesAuth;

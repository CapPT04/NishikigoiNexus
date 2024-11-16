import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const StaffRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(Cookies.get("user"));
    if (!user || (user.Role !== "3" && user.Role !== "4")) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};

export default StaffRoute;

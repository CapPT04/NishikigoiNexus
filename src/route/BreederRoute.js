import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BreederRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (!user || user.Role !== "2") {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};

export default BreederRoute;

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";

const PaymentRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (!user && (user.Role !== "1" || user.Role !== "2")) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};

export default PaymentRoute;

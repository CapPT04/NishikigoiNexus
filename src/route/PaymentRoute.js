import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const PaymentRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user && (user.Role !== "1" || user.Role !== "2")) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};

export default PaymentRoute;

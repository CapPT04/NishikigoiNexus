import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserRoute = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || user.Role !== "1") {
            navigate("/");
        }
    }, []);
    return <Outlet />;
};

export default UserRoute;

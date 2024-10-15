/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_png.png";

const Navbar = () => {
  const user = sessionStorage.getItem("user");
  useEffect(() => {
    // localStorage.removeItem("user");
    console.log("user: ", user);
  });
  const navigate = useNavigate();
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left-content">
        <img className="logo" src={logo} alt="Logo Nishikigoi" />
        <div className="project-name">Nishikigoi Nexus</div>
      </div>

      <div className="navigation-bar-right-content">
        <a
          className="staffBreeder"
          style={{
            display: user ? "" : "none",
          }}
          onClick={() => navigate("/")}
        >
          REQUEST
        </a>
        <a className="home" onClick={() => navigate("/")}>
          HOME
        </a>
        <a className="auction" onClick={() => navigate("/auction")}>
          AUCTION
        </a>
        <a className="blog" onClick={() => navigate("/blog")}>
          BLOG
        </a>
        <a className="about" onClick={() => navigate("/about")}>
          ABOUT
        </a>
        <div className="account" onClick={() => navigate("/login")}>
          SIGN UP
        </div>
      </div>
    </div>
  );
};

export default Navbar;

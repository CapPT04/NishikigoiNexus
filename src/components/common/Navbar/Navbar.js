import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_png.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left-content">
        <img className="logo" src={logo} alt="Logo Nishikigoi" />
        <div className="project-name">Nishikigoi Nexus</div>
      </div>

      <div className="navigation-bar-right-content">
        <a className="home">HOME</a>
        <a className="auction">AUCTION</a>
        <a className="blog">BLOG</a>
        <a className="about">ABOUT</a>
        <div className="account" onClick={() => navigate("/login")}>
          SIGN UP
        </div>
      </div>
    </div>
  );
};

export default Navbar;

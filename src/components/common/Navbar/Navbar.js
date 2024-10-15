/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogout } from "../../../axios/UserService";
import logo from "../../../assets/images/logo_png.png";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const userStorage = sessionStorage.getItem("user");
  const user = JSON.parse(userStorage);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {});

  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left-content">
        <img className="logo" src={logo} alt="Logo Nishikigoi" />
        <div className="project-name">Nishikigoi Nexus</div>
      </div>

      <div className="navigation-bar-right-content">
        {user && (
          <a
            className="staffBreeder"
            style={{
              display: user ? "" : "none",
            }}
            onClick={() => navigate("/")}
          >
            {user.Role === "1" ? "" : user.Role === "2" ? "REQUEST" : "STAFF"}
          </a>
        )}
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
        {!user && (
          <div className="account" onClick={() => navigate("/login")}>
            LOGIN
          </div>
        )}
        {user && (
          <div class="account-dropdown">
            <button class="dropdown-button">
              {user.FirstName + " " + user.lastName}{" "}
              <span class="arrow-down">▼</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <i class="fa-regular fa-user icon-account"></i> Account
              </li>
              <li>
                <i class="fa fa-history icon-history" aria-hidden="true"></i>
                History
              </li>
              <li onClick={() => handleLogout()}>
                <i class="fa-solid fa-right-from-bracket icon-logout"></i>{" "}
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

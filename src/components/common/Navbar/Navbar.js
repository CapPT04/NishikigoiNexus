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

  useEffect(() => { });

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleHistory = () => {
    const role = user.Role;
    console.log(role);
    if (role === "2") {
      navigate("/Breeder/HistoryRequest");
    } else if (role === "1") {
      navigate("/User/UserBidHistory");
    }
  };

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
              display: user.Role !== "1" ? "" : "none",
            }}
            onClick={() => {
              user.Role === "2"
                ? navigate("/Breeder/CreateRequest")
                : navigate("/Manager/Manage");
            }}
          >
            {user.Role === "1"
              ? ""
              : user.Role === "2"
                ? "REQUEST"
                : user.Role === "3"
                  ? "Staff"
                  : "Manager"}
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
          <div className="account-dropdown">
            <button className="dropdown-button">
              {user.FirstName + " " + user.lastName}{" "}
              <span className="arrow-down">▼</span>
            </button>
            <ul className="dropdown-menu">
              <li
                onClick={() => navigate("/user/userwallet")}
              >
                <i className="fa-regular fa-user icon-account"></i> Account
              </li>
              <li onClick={() => handleHistory()}>
                <i
                  className="fa fa-history icon-history"
                  aria-hidden="true"
                ></i>
                History
              </li>
              <li onClick={() => handleLogout()}>
                <i className="fa-solid fa-right-from-bracket icon-logout"></i>{" "}
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

import React from "react";
import "./NotFound.scss";
import Navbar from "../common/Navbar/Navbar";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="not-found-content">
        <div className="title">Oops! Coming Soon...</div>
        <div className="description">
          This feature will coming in the future !!!!!
        </div>
        <div className="back-home">
          <div className="title-back-home">Back to Home Page to continue</div>
          <button onClick={() => navigate("/")} className="btn-back-home">
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

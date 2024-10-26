import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VerticallyNavbar.scss";

const VerticallyNavbar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Helper function to navigate to a new route
  const handleSelect = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="navigation-bar-vertically">
      <a
        className="member"
        onClick={() => handleSelect("/Manager/Manage")}
      >
        Member
      </a>
      <a
        className="breeder"
        onClick={() => handleSelect("/Manager/ManageBreeder")}
      >
        Breeder
      </a>
      <a
        className="request"
        onClick={() => handleSelect("/Manager/ManageRequest")}
      >
        Request
      </a>
      <a
        className="auction-vertically"
        onClick={() => handleSelect("/Manager/ManageAuction")}
      >
        Auction
      </a>
      <a
        className="koi"
        onClick={() => handleSelect("/Manager/ManageKoi")}
      >
        KOI
      </a>
      <a
        className="fishEntry"
        onClick={() => handleSelect("/Manager/ManageFishEntry")}
      >
        Fish Entry
      </a>
      <a
        className="blog-vertically"
        onClick={() => handleSelect("/Manager/Blog")} // Navigate to '/blog'
      >
        Blog
      </a>
    </div>
  );
};

export default VerticallyNavbar;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VerticallyNavbar.scss";
import Cookies from "js-cookie";

const VerticallyNavbar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Helper function to navigate to a new route
  const handleSelect = (path) => {
    navigate(path); // Navigate to the specified path
  };

  // Get user data from sessionStorage
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  // Add a check to ensure user is not null or undefined
  if (!user) {
    return <div>Loading...</div>; // Or handle the case when the user is not found
  }

  return (
    <div className="navigation-bar-vertically">
      {user && user.Role === "4" ? (
        <>
          <a
            className="dashboard-vertically"
            onClick={() => handleSelect("/Manager/DashBoard")}
          >
            DashBoard
          </a>
          <a
            className="dashboard-vertically"
            onClick={() => handleSelect("/Manager/ManageStaff")}
          >
            Staff
          </a>
        </>
      ) : null}

      <a className="member" onClick={() => handleSelect("/Manager/Manage")}>
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
      <a className="koi" onClick={() => handleSelect("/Manager/ManageKoi")}>
        KOI
      </a>
      <a
        className="fishEntry"
        onClick={() => handleSelect("/Manager/ManageFishEntry")}
      >
        Fish Entry
      </a>
      <a
        className="delivery"
        onClick={() => handleSelect("/Manager/ManageDelivery")}
      >
        Delivery
      </a>
      <a
        className="unpaid"
        onClick={() => handleSelect("/Manager/ManageUnpaid")}
      >
        Unpaid
      </a>
    </div>
  );
};

export default VerticallyNavbar;

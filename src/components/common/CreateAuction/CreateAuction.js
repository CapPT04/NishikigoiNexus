import React, { useState } from "react";
import "./CreateAuction.scss";
import { useNavigate } from "react-router-dom";
import { handleCreateAuctionApi } from "../../../axios/UserService";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const CreateAuction = () => {
  const navigate = useNavigate();
  const [auctionDate, setAuctionDate] = useState("");

  const handleSaveButton = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await handleCreateAuctionApi(token, auctionDate);

      if (response && response.status === 200) {
        toast.success("Auction created successfully! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/Manager/ManageAuction");
        }, 3500);
      } else {
        toast.error("Failed to create auction. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) { }
  };

  return (
    <div className="create-auction-page">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="create-auction-background">
        <div className="create-auction-content">
          <div className="auction-date">
            <label htmlFor="auction-date-input" className="auction-date-label">
              Auction Date
            </label>
            <input
              type="datetime-local"
              className="auction-date-input"
              placeholder="YYYY/MM/DD"
              value={auctionDate}
              onChange={(event) => setAuctionDate(event.target.value)}
            />
          </div>
          <div className="create-auction-content-btn">
            <button onClick={() => handleSaveButton()} className="create-btn">
              Create
            </button>
            <button
              onClick={() => navigate("/Manager/ManageAuction")}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;

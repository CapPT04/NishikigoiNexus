import React, { useEffect, useState } from "react";
import "./AuctionDetail.scss";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { useLocation, useNavigate } from "react-router";
import {
  handleAddFishEntryForAuctionApi,
  handleDeleteFishEntryInAuctionApi,
  handleGetFishEntryForAuctionApi,
  handleGetFishEntryInAuction,
  handlePublicAuctionApi,
  handleGetAuctionByIdApi,
  handleEndFishAuctioningApi,
} from "../../axios/UserService";
import logo from "../../assets/images/logo_png.png";
import { handleUpdateAuctionDetailApi } from "../../axios/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Navbar from "../common/Navbar/Navbar";
import { Navigate } from "react-router";
const AuctionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auctionId = location.state?.auctionId;
  const [auction, setAuction] = useState({});
  const [fishEntryInAuction, setFishEntryInAuction] = useState([]);
  const [fishEntryForAuction, setFishEntryForAuction] = useState([]);
  const [showFishEntryTable, setShowFishEntryTable] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const fetchFishEntryForAuction = async () => {
    try {
      const response = await handleGetFishEntryForAuctionApi();
      if (response && (response.status === 404 || response.status === 200)) {
        setFishEntryForAuction(response.data.$values || []);
      }
    } catch (error) {
      console.error("Error fetching auction details:", error);
    }
  };

  const fetchAuctionDetails = async () => {
    try {
      const response = await handleGetAuctionByIdApi(parseInt(auctionId, 10));
      if (response && response.status === 200) {
        setAuction(response.data);
      }
    } catch (error) {
      console.error("Error fetching auction details:", error);
    }
  };

  const fetchFishEntryInAuction = async () => {
    try {
      const response = await handleGetFishEntryInAuction(
        parseInt(auctionId, 10)
      );
      setFishEntryInAuction(response.data.$values || []);
    } catch (error) {
      console.error("Error fetching fish entries in auction:", error);
    }
  };
  useEffect(() => {
    if (!auctionId) {
      navigate("/");
    } else {
      fetchAuctionDetails();
      fetchFishEntryInAuction();
      fetchFishEntryForAuction();
    }
  }, [auctionId, fishEntryInAuction]);
  const handleEndBtn = async (fishEntry) => {
    try {
      const response = await handleEndFishAuctioningApi(
        fishEntry.fishEntryId,
        sessionStorage.getItem("token")
      ); if (response && response.status === 200) {
        showToast("success", "Auction updated successfully!");
        //refresh
        await fetchFishEntryInAuction();
        await fetchFishEntryForAuction();
      } else {
        showToast("error", "Failed to update auction. Please try again.");
      }
    } catch (error) {
      console.error("Error updating auction:", error);
      showToast("error", "An error occurred while updating. Please try again.");
    }
  };
  const handleUpdateBtn = async (fishEntry) => {
    try {
      const updatedStartTime = startTime || fishEntry.startDate;
      const updatedFinishTime = finishTime || fishEntry.endDate;
      const response = await handleUpdateAuctionDetailApi(
        fishEntry.fishEntryId,
        updatedStartTime,
        updatedFinishTime
      );

      if (response && response.status === 200) {
        showToast("success", "Auction updated successfully!");
      } else {
        showToast("error", "Failed to update auction. Please try again.");
      }
    } catch (error) {
      console.error("Error updating auction:", error);
      showToast("error", "An error occurred while updating. Please try again.");
    }
  };

  const handleDeleteFishEntryInAuction = async (fishEntry) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handleDeleteFishEntryInAuctionApi(
            auctionId,
            fishEntry.fishEntryId
          );
          if (response && response.status === 200) {
            Swal.fire(
              "Deleted!",
              "The fish entry has been deleted.",
              "success"
            );
            // Refresh both tables after deletion
            fetchFishEntryInAuction();
            fetchFishEntryForAuction();
          } else {
            Swal.fire("Failed!", "Could not delete the fish entry.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "An error occurred. Please try again.", "error");
        }
      }
    });
  };

  const handleAddFishEntryBtn = async () => {
    try {
      setShowFishEntryTable(true);
      fetchFishEntryForAuction();
    } catch (error) {
      console.error("Error fetching fish entries:", error);
    }
  };

  const handleAddFishEntryToAuction = async (fishEntry) => {
    try {
      const response = await handleAddFishEntryForAuctionApi(
        fishEntry.fishEntryId,
        auctionId,
        sessionStorage.getItem("token")
      );
      if (response && response.status === 200) {
        showToast("success", "Fish entry added to auction successfully!");
        await fetchFishEntryInAuction(); // Refresh fish entry in auctionawait fetchFishEntryForAuction(); // Refresh fish entries for auction
      } else {
        showToast("error", "Failed to add fish entry. Please try again.");
      }
    } catch (error) {
      console.error("Error adding fish entry:", error);
      showToast("error", "An error occurred. Please try again.");
    }
  };

  const handlePublicAuctionBtn = async () => {
    Swal.fire({
      title: "Publish Auction",
      text: "Are you sure you want to publish this auction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, publish it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handlePublicAuctionApi(auctionId);
          if (response && response.status === 200) {
            setAuction((prev) => ({ ...prev, status: 2 }));
            Swal.fire(
              "Published!",
              "The auction has been published.",
              "success"
            );
          }
        } catch (error) {
          console.error("Error publishing auction:", error);
          Swal.fire(
            "Error!",
            "Could not publish auction. Please try again.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="auction-detail-container">
      <ToastContainer />
      <div className="header">
        {/* <div className="navigation-bar">
          <div className="navigation-bar-left-content">
            <img className="logo" src={logo} alt="" />
            <div className="project-name">Nishikigoi Nexus</div>
          </div>

          <div className="navigation-bar-right-content">
            <a className="staff">STAFF</a>
            <a className="home">HOME</a>
            <a className="auction">AUCTION</a>
            <a className="blog">BLOG</a>
            <a className="about">ABOUT</a>
            <a className="account">ACCOUNT</a>
          </div>
        </div> */}
        <Navbar></Navbar>
      </div>

      <div className="body-content-auction-detail">
        <VerticallyNavbar />

        <div className="body-content-right-auction-detail">
          <div className="auction-detail-content">
            <div className="auction-detail-content-row1">
              <div className="status">
                Status: &nbsp;
                {auction.status === 1 && "Preparing"}
                {auction.status === 2 && "Waiting"}
                {auction.status === 3 && "Bidding"}
                {auction.status === 4 && "Ended"}
              </div>
              {auction.status === 1 && (
                <button
                  className="public-auction"
                  onClick={() => handlePublicAuctionBtn()}
                >
                  Public Auction
                </button>
              )}
            </div><div className="auction-detail-content-row2">Auction Detail</div>

            <div className="auction-detail-content-row4">
              <label htmlFor="start-date-input" className="start-date-label">
                Start Date
              </label>
              <input
                type="datetime-local"
                className="start-date-input"
                value={auction?.startDate || "YYYY-MM-DDTHH:MM"}
                readOnly // Assuming this is a read-only field; remove if editable
              />
            </div>

            <div className="auction-detail-content-row5">
              <div className="add-fish">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => handleAddFishEntryBtn()}
                ></i>
              </div>
            </div>
            {showFishEntryTable && (
              <div className="auction-detail-content-row7">
                <table className="table-added-fish-entry">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>FishEntry ID</th>
                      <th>Expected Date</th>
                      <th>Method</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fishEntryForAuction && fishEntryForAuction.length > 0 ? (
                      fishEntryForAuction.map((fishEntry, index) => (
                        <tr key={fishEntry.fishEntryId || index}>
                          <td>{index + 1}</td>
                          <td>{fishEntry.fishEntryId || "Unknown Fish"}</td>
                          <td>{fishEntry.expectedDate || "N/A"}</td>
                          <td>
                            {fishEntry.auctionMethod === 1 && "FixedPriceSale"}
                            {fishEntry.auctionMethod === 2 && "SecretBid"}
                            {fishEntry.auctionMethod === 3 && "PublicBid"}
                            {fishEntry.auctionMethod === 4 && "DutchAuction"}
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-plus"
                              onClick={() =>
                                handleAddFishEntryToAuction(fishEntry)
                              }
                            ></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No FishEntry available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="auction-detail-content-row6">
              <table className="table-manage-auction">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Fish Entry</th><th>Start Time</th>
                    <th>Finish Time</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {fishEntryInAuction.length > 0 ? (
                    fishEntryInAuction.map((fishEntry, index) => (
                      <tr key={fishEntry.id || index}>
                        <td>{index + 1}</td>
                        <td>{fishEntry.fishEntryId || "Unknown Fish"}</td>
                        <td>
                          <input
                            type="datetime-local"
                            className="start-time-input"
                            onChange={(even) => setStartTime(even.target.value)}
                            defaultValue={fishEntry.startDate}
                          />
                        </td>
                        <td>
                          <input
                            type="datetime-local"
                            className="finish-time-input"
                            onChange={(even) =>
                              setFinishTime(even.target.value)
                            }
                            defaultValue={fishEntry.endDate}
                          />
                        </td>
                        <td>
                          {fishEntry.status === 1 && "Preparing"}
                          {fishEntry.status === 2 && "Waiting"}
                          {fishEntry.status === 3 && "Bidding"}
                          {fishEntry.status === 4 && "Ended"}
                        </td>
                        <td>
                          {fishEntry.status === 3 ? (
                            <button
                              className="update-btn"
                              onClick={() => handleEndBtn(fishEntry)}
                            >
                              End Bidding
                            </button>
                          ) : fishEntry.status === 2 ? (
                            <button
                              className="update-btn"
                              onClick={() => handleUpdateBtn(fishEntry)}
                            >
                              Update
                            </button>
                          ) : fishEntry.status === 4 ? (
                            <button
                              className="update-btn"
                              onClick={() => handleUpdateBtn(fishEntry)}
                              disabled
                              style={{ background: "#000" }}
                            >
                              Unavailable
                            </button>
                          ) : null}
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash delete-icon"
                            onClick={() => handleDeleteFishEntryInAuction(fishEntry)
                            }
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No FishEntry available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
import React, { useEffect, useState } from "react";
import "./AuctionDetail.scss";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { useLocation } from "react-router";
import {
  handleAddFishEntryForAuctionApi,
  handleDeleteFishEntryInAuctionApi,
  handleGetFishEntryForAuctionApi,
  handleGetFishEntryInAuction,
  handlePublicAuctionApi,
  handleGetAuctionByIdApi
} from "../../axios/UserService";
import logo from "../../assets/images/logo_png.png";
import { handleUpdateAuctionDetailApi } from "../../axios/UserService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Navbar from "../common/Navbar/Navbar";

const AuctionDetail = () => {
  const location = useLocation();
  const auctionId = useState(location.state.auctionId);
  const [auction, setAuction] = useState({});

  const [fishEntryInAuction, setFishEntryInAuction] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  // console.log(startTime);
  // console.log(finishTime);
  const [fishEntryForAuction, setFishEntryForAuction] = useState([]);
  const [showFishEntryTable, setShowFishEntryTable] = useState(false);
  const [auctionStatus, setAuctionStatus] = useState(auction.status);
  console.log(auction);


  useEffect(() => {
    const fetchGetAuction = async () => {
      try {
        const response = await handleGetAuctionByIdApi(
          parseInt(auctionId)
        );
        console.log(response);

        setAuction(response.data)
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchGetAuction();
  }, []);


  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        // console.log("Location Object:", location);
        // console.log("Auction Data:", auction);
        const response = await handleGetFishEntryInAuction(
          parseInt(auction.auctionId, 10)
        );
        setFishEntryInAuction(response.data.$values || []);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchAuctions();
  }, [location, auction, auction.status]);

  const handleUpdateBtn = async (fishEntry) => {
    try {
      const updatedStartTime = startTime || fishEntry.startDate;
      const updatedFinishTime = finishTime || fishEntry.endDate;
      const response = await handleUpdateAuctionDetailApi(
        fishEntry.fishEntryId,
        updatedStartTime,
        updatedFinishTime
      );
      // console.log(response);

      if (response && response.status === 200) {
        toast.success("Auction updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to update auction. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error updating auction:", error);
      toast.error("An error occurred while updating. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // fetchAuctions();
  // }, [location, auction]);

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
            auction.auctionId,
            fishEntry.fishEntryId
          );

          if (response && response.status === 200) {
            const updatedAuctionEntriesResponse =
              await handleGetFishEntryInAuction(parseInt(auction.auctionId, 10));
            setFishEntryInAuction(
              updatedAuctionEntriesResponse.data.$values || []
            );
            const availableFishEntriesResponse =
              await handleGetFishEntryForAuctionApi();
            setFishEntryForAuction(
              availableFishEntriesResponse.data.$values || []
            );
            Swal.fire("Deleted!", "The fish entry has been deleted.", "success");
          } else {
            Swal.fire("Deleted!", "Failed to delete.", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an issue deleting the fish entry. Please try again.",
            "error"
          );
        }
      } else {
        Swal.fire("Cancelled", "Your fish entry is safe :)", "info");
      }
    });
  };

  const handleAddFishBtn = async () => {
    try {
      const response = await handleGetFishEntryForAuctionApi();
      // console.log(response);
      setFishEntryForAuction(response.data.$values);
      setShowFishEntryTable(true);
    } catch (error) {
      throw error;
    }
  };
  const handleAddFishEntryToAuction = async (fishEntry) => {
    try {
      const response = await handleAddFishEntryForAuctionApi(
        fishEntry.fishEntryId,
        auction.auctionId,
        sessionStorage.getItem("token")
      );
      // console.log(response);

      if (response && response.status === 200) {
        // Fetch updated fish entries in auction after successful addition
        const updatedAuctionEntriesResponse = await handleGetFishEntryInAuction(
          parseInt(auction.auctionId, 10)
        );
        setFishEntryInAuction(updatedAuctionEntriesResponse.data.$values || []); // Update state for auction entries

        // Fetch available fish entries for auction
        const availableFishEntriesResponse =
          await handleGetFishEntryForAuctionApi();
        setFishEntryForAuction(availableFishEntriesResponse.data.$values || []); // Update state for available fish entries

        toast.success("Fish entry added to auction successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to add fish entry. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error adding fish entry:", error);
      toast.error(
        "An error occurred while adding the fish entry. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handlePublicAuctionBtn = async () => {
    Swal.fire({
      title: "Publish Auction",
      text: "Are you sure you want to publish this auction? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, publish it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handlePublicAuctionApi(auction.auctionId);
          // console.log(auction.auctionId);
          // Cập nhật trạng thái phiên đấu giá nếu phản hồi thành công
          if (response && response.status === 200) {
            // Giả định rằng phản hồi sẽ có trạng thái mới, nếu không thì bạn có thể cần gọi lại API để lấy thông tin mới
            setAuction((prev) => ({ ...prev, status: 2 })); // Thay thế `2` bằng trạng thái mới nếu cần
          }
          Swal.fire(
            "Published!",
            "The auction has been published successfully.",
            "success"
          );
        } catch (error) {
          console.error("Error publishing auction:", error);
          Swal.fire(
            "Error!",
            "There was an issue publishing the auction. Please try again.",
            "error"
          );
        }
      } else {
        Swal.fire("Cancelled", "Your auction is safe :)", "info");
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
            </div>

            <div className="auction-detail-content-row2">Auction Detail</div>

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
                  onClick={() => handleAddFishBtn()}
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
                    <th>Fish Entry</th>
                    <th>Start Time</th>
                    <th>Finish Time</th>
                    <th>Status</th>
                    <th>Update</th>
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
                          <button
                            className="update-btn"
                            onClick={() => handleUpdateBtn(fishEntry)}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash delete-icon"
                            onClick={() =>
                              handleDeleteFishEntryInAuction(fishEntry)
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

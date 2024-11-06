import React, { useEffect, useState } from "react";
import "./FishAuctionMethod1.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

import {
  handleFishEntryById,
  handleFixedPriceHistory,
  handleGetFishDetailById,
  handleGetFishImgById,
  handleGetWinnerApi,
  handlePlaceFixedPrice,
  handleCheckEnrollApi,
  handleEnrollApi,
  handleGetFishEntryDepositApi
} from "../../../axios/UserService";
import * as signalR from "@microsoft/signalr";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const FishAuctionMethod1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auctionItem = useLocation().state.auctionItem;
  const auctionId = useLocation().state.auctionId;
  const [fishEntry, setFishEntry] = useState("");
  const [fishInfo, setFishInfo] = useState("");
  const [fishImgs, setFishImgs] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [currentPlaced, setCurrentPlaced] = useState(0);
  const [winnerData, setWinnerData] = useState("");
  const [checkEnroll, setCheckEnroll] = useState(false);
  const [fishEntryDeposit, setFishEntryDeposit] = useState(0);

  const handleEnrollBtn = async () => {
    // Show confirmation dialog with deposit amount

    const result = await Swal.fire({
      title: 'Confirm Enrollment',
      text: `To enroll in this auction, a deposit of ${fishEntryDeposit} VND is required. Do you wish to proceed?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel'
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Enrolling...',
          text: 'Please wait while we enroll you in the auction.',
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await handleEnrollApi(sessionStorage.getItem("token"), auctionItem.fishEntryId);
        console.log(response);

        if (response && response.status === 200) {
          // Success notification
          Swal.fire({
            icon: 'success',
            title: 'Enrollment Successful!',
            text: `You have been successfully enrolled with a ${fishEntryDeposit} VND deposit.`
          }).then(() => {
            // Reload the page after the user clicks "OK" on the success message
            window.location.reload(); // This will reload the current page
          });
          // Update component state (if needed)
        } else if (response && response.status === 400) {
          // Handle insufficient balance error
          Swal.fire({
            icon: 'error',
            title: 'Enrollment Failed',
            text: 'You do not have enough balance to enroll! Please deposit money into your account.',
            showCancelButton: true,
            confirmButtonText: 'Go to Deposit Page',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to deposit page
              if (JSON.parse(sessionStorage.getItem("user")).Role === "1") {
                navigate("/user/UserWallet");
              } else if (JSON.parse(sessionStorage.getItem("user")).Role === "2") {
                navigate("/breeder/UserWallet");

              }
            }
          });
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Enrollment Failed',
          text: 'There was an error enrolling in the auction. Please try again later.'
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Enrollment Canceled',
        text: 'You chose not to proceed with the enrollment.'
      });
    }
  };

  useEffect(() => {
    const fishEntryDeposit = async () => {
      try {
        const response = await handleGetFishEntryDepositApi(auctionItem.fishEntryId);
        if (response && response.status === 200) {
          setFishEntryDeposit(response.data);
        } else if (response.status === 400) {
          setFishEntryDeposit(0);
        }
      } catch (error) {
        console.error("Error checking gt fish entry deposite status:", error);
      }
    };
    fishEntryDeposit();
  }, [auctionItem.fishEntryId]);
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        const response = await handleCheckEnrollApi(sessionStorage.getItem("token"), auctionItem.fishEntryId);
        console.log(response);
        console.log(sessionStorage.getItem("token"));
        console.log(response.status);
        if (response && response.status === 200) {
          setCheckEnroll(true);
        } else if (response.status === 400) {
          setCheckEnroll(false);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
        setCheckEnroll(false);
      }
    };
    checkEnrollmentStatus();
  }, []);

  const getInfo = async () => {
    if (auctionItem) {
      const resFishEntry = await handleFishEntryById(auctionItem.fishEntryId);
      setFishEntry(resFishEntry.data);

      const resFish = await handleGetFishDetailById(resFishEntry.data.fishId);
      setFishInfo(resFish.data);

      const resImgs = await handleGetFishImgById(resFishEntry.data.fishId);
      setFishImgs(resImgs.data.$values);
      setMainImage(resImgs.data.$values[0]?.imagePath || "");

      const resHis = await handleFixedPriceHistory(auctionItem.fishEntryId);
      // console.log(resHis.data.$values);
      setBidHistory(resHis.data.$values);
      // setBidHistory((prevBids) => [...prevBids, resHis.data.$values]);

      // setCurrentPlaced(resHis.data.)
    } else {
      navigate("/AuctionDetails");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://localhost:7124/fixedPriceSale?fishEntryId=${fishEntry.fishEntryId}`
      ) // URL của Hub trong ASP.NET Core
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
        // Listen for the event ReceiveBidPlacement
        connection.on("ReceiveBidPlacement", (FixedPriceSaleResponse) => {
          // console.log("Received bid placement: ", data);
          // Update bids list when new data is received
          setBidHistory((prevBids) => [...prevBids, FixedPriceSaleResponse]);
        });
        connection.on("AuctionEnded", (data) => {
          //reload page when auction end
          window.location.reload();
        });
        connection.on("AuctionStart", (data) => {
          //reload page when auction start
          window.location.reload();
        });
        // console.log("his:", bidHistory);
        setCurrentPlaced(bidHistory.slice(-1)[0].numberOfBidders);
      })
      .catch((err) => console.log("Error while starting connection: " + err));
    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, [bidHistory, currentPlaced]);

  const placeABid = async () => {
    if (sessionStorage.getItem("token") === null) {
      console.log(sessionStorage.getItem("token"));
      navigate("/login");
    }
    const token = sessionStorage.getItem("token");
    const response = await handlePlaceFixedPrice(
      token,
      auctionItem.fishEntryId
    );
    if (response.status === 200) {
      toast.success("Placed a bid", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(response.data, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const fetchWinnerData = async () => {
      if (auctionItem.status === 4) {
        try {
          const response = await handleGetWinnerApi(auctionItem.fishEntryId);
          if (response && response.status === 200) {
            setWinnerData(response.data);
          } else if (response.status === 404 && response.data === "No winner") {
            setWinnerData(null); // Set winnerData to null when there is no winner
          } else {
            console.log(response);
          }
        } catch (error) {
          console.error("Error fetching winner data:", error);
        }
      } else {
        setWinnerData(null);
      }
    };

    fetchWinnerData();
  }, [auctionItem.status, auctionItem.fishEntryId]);

  return (
    <div className="auction-screen-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="fish-aucction-method3-content">
        <ToastContainer />
        <div className="fish-aucction-method3-content-row1">
          Auction#{auctionId}
        </div>
        <div className="fish-aucction-method3-content-row2">
          {fishEntry.status === 3
            ? `Ending in: ${new Date(auctionItem.endTime).toLocaleString()}`
            : fishEntry.status === 2
            ? "Waiting"
            : "Ended"}

        </div>
        <div className="fish-aucction-method3-content-row3">
          <div className="fish-aucction-method3-content-row3-col1">
            <img className="main-fish-img" src={mainImage} alt="Main Fish" />
            <div className="fish-sub-img">
              {fishImgs.map((img, index) => (
                <div
                  key={index}
                  className="fish-sub-img1"
                  onMouseEnter={() => setMainImage(img.imagePath)} // Hover to change main image
                  onMouseLeave={() => setMainImage(fishImgs[0].imagePath)}
                >
                  <img src={img.imagePath} alt={`Fish ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="fish-aucction-method3-content-row3-col2">
            <div className="fish-info">
              <div className="fish-info-row1">
                <div className="fish-info-name">{fishInfo.fishName}</div>
                <div className="fish-info-notion">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              </div>
              <div className="fish-info-row2">
                <div className="fish-info-ending">
                  Ending in: {new Date(auctionItem.endTime).toLocaleString()}
                </div>
                <div className="fish-info-tag">
                  <i className="fa-solid fa-tag"></i>
                  <div className="fish-number">
                    Fish#{auctionItem.fishEntryId}
                  </div>
                </div>
              </div>
              <div className="fish-info-row3">
                <div className="fish-info-weight">
                  <i className="fa-solid fa-weight-hanging"></i>
                  <div className="weight-number">{fishInfo.weight} gram</div>
                </div>
                <div className="fish-info-length">
                  <i className="fa-solid fa-ruler"></i>
                  <div className="length-number">{fishInfo.size} mm</div>
                </div>
              </div>
              <div className="fish-info-row4">
                <div className="fish-info-gender">
                  <i className="fa-solid fa-venus-mars"></i>
                  <div className="gender-text">
                    {fishInfo.gender === 1 ? "Male" : "Female"}
                  </div>
                </div>
                <div className="fish-info-age">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="age-text">{fishInfo.age} months</div>
                </div>
              </div>
              <div className="fish-info-row5">
                <div className="fish-info-origin">
                  <i className="fa-solid fa-earth-americas"></i>
                  <div className="origin-text">{fishInfo.origin}</div>
                </div>
              </div>
            </div>
            <div className="bidding-history-background">
              <div className="bidding-history-content">
                {bidHistory.slice(-5).map((bid, index) => {
                  if (bid.name) {
                    return (
                      <div key={index} className="bidding-history-info">
                        <div className="bidding-time">
                          {new Date(bid.bidTime).toLocaleString()} &nbsp;{" "}
                        </div>
                        <div className="bidding-name-bidder">
                          {bid.name} placed a bid &nbsp;
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {(auctionItem.status === 3 || auctionItem.status === 2) && (
              <div className="place-bid">
                <div className="place-bid-content">
                  <div className="place-bid-content-row1">
                    <div className="number-of-bidders-icon">
                      <i className="fa-solid fa-users-line"></i>
                    </div>
                    <div className="number-of-bidders-text">
                      Number of bidders
                    </div>
                    <div className="number-of-bidders">{currentPlaced}</div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row2">
                    <div className="buy-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="buy-price-text">Buy price</div>
                  </div>
                  <div className="place-bid-content-row31">
                    {fishEntry.minPrice} VND
                  </div>

                  {checkEnroll ? (
                    <button className="place-bid-btn" onClick={placeABid}>
                      {auctionItem.status === 2 ? "The auction has not started." : `Place bid at ${fishEntry.minPrice} VND`}

                    </button>
                  ) : (
                    <button className="enroll-bid"
                      onClick={() => handleEnrollBtn()}>
                      Enroll with {fishEntryDeposit} VND deposit
                    </button>
                  )}

                </div>
              </div>
            )}

            {auctionItem.status === 4 && winnerData ? (
              <div className="place-bid-status4">
                <div className="place-bid-content-status4">
                  <div className="place-bid-content-row1-status4">
                    {winnerData.name}
                  </div>
                  <hr />
                  <div className="place-bid-content-row2-status4">
                    ${winnerData.amount}
                  </div>
                  <div className="place-bid-content-row3-status4">
                    {new Date(winnerData.endDate).toLocaleString()}
                  </div>
                </div>
              </div>
            ) : auctionItem.status === 4 && winnerData === null ? (
              <div className="place-bid-status4">
                <div className="place-bid-content-status4">
                  <div className="place-bid-content-row1-status4-no-winner">
                    This Bidding ended without any winner!
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="logo-footer">
          <img
            className="logo-img-footer"
            src="../../assets/images/logo_png.png"
            alt=""
          />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src="../../assets/images/Instagram.svg" alt="" />
          </div>
          <div className="facebook">
            <img src="../../assets/images/Social Icons (1).svg" alt="" />
          </div>
          <div className="google">
            <img src="../../assets/images/Vector.svg" alt="" />
          </div>
        </div>
        <div className="nav-bar-footer">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
      </footer>
    </div>
  );
};

export default FishAuctionMethod1;

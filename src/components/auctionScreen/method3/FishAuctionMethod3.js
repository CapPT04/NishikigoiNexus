import React, { useEffect, useState } from "react";
import "./FishAuctionMethod3.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  handleBidHistory,
  handleFishEntryById,
  handleGetFishDetailById,
  handleGetFishImgById,
  handleGetWinnerApi,
  handlePublicBidding,
} from "../../../axios/UserService";
import * as signalR from "@microsoft/signalr";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const FishAuctionMethod3 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [fishEntry, setFishEntry] = useState("");
  const [fishInfo, setFishInfo] = useState("");
  const [fishImgs, setFishImgs] = useState([]);
  const [mainImage, setMainImage] = useState(""); // For handling the main image
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [bids, setBids] = useState([]);
  const [highestPrice, setHighestPrice] = useState(null);
  const entryId = location.state.auctionItem.fishEntryId;
  const [winnerData, setWinnerData] = useState("");

  const getFishEntry = async () => {
    if (entryId) {
      const res = await handleFishEntryById(entryId);
      setFishEntry(res.data);
      setStepPrice(res.data.increment);
      setCurrentPrice(res.data.minPrice);
      const resFish = await handleGetFishDetailById(res.data.fishId);
      setFishInfo(resFish.data);
      const resImgs = await handleGetFishImgById(resFish.data.fishId);
      setFishImgs(resImgs.data.$values);
      setMainImage(resImgs.data.$values[0]?.imagePath || "");

      const his = await handleBidHistory(entryId);
      console.log(his.data.$values);
      // Spread to flatten the array
      // setBids((preBid) => [...preBid, his.data.$values]);
      setBids(his.data.$values);
      // setCurrentPrice(his.data.$values.slice(-1)[0]?.currentPrice);
    } else {
      navigate("/AuctionDetails");
    }
  };
  const handleIncrement = () => {
    setIncrement((prevIncrement) => Math.min(prevIncrement + 1, 5)); // Limit to max of 5
  };

  const handleDecrement = () => {
    setIncrement((prevIncrement) => Math.max(prevIncrement - 1, 1)); // Limit to min of 1
  };

  useEffect(() => {
    getFishEntry();
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7124/publicBidHub") // URL của Hub trong ASP.NET Core
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
        // Listen for the event ReceiveBidPlacement
        connection.on("ReceiveBidPlacement", (data) => {
          //   console.log("Received bid placement: ", data);
          // Update bids list when new data is received
          setBids((prevBids) => [...prevBids, data]);
        });
        setCurrentPrice(bids.slice(-1)[0].currentPrice);
      })
      .catch((err) => console.log("Error while starting connection: " + err));
    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, [bids, currentPrice]);

  const totalBidPrice = stepPrice * increment;
  const newPrice = currentPrice + totalBidPrice;
  const bidding = async () => {
    if (sessionStorage.getItem("token") === null) {
      console.log(sessionStorage.getItem("token"));
      navigate("/login");
      return;
    }
    const token = sessionStorage.getItem("token");
    const res = await handlePublicBidding(token, entryId, newPrice);
    if (res.status === 400) {
      toast.error(res.data, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // getFishEntry();
  };
  useEffect(() => {
    const fetchWinnerData = async () => {
      if (fishEntry.status === 4) {
        try {
          const response = await handleGetWinnerApi(fishEntry.fishEntryId);
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
  }, [fishEntry.status, fishEntry.fishEntryId]);
  return (
    <div className="auction-screen-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="fish-aucction-method3-content">
        <ToastContainer />
        <div className="fish-aucction-method3-content-row1">Auction#13</div>
        <div className="fish-aucction-method3-content-row2">
          {fishEntry.status === 3
            ? `Ending in: ${new Date(fishEntry.endTime).toLocaleString()}`
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
                  Ending in: {new Date(fishEntry.endDate).toLocaleString()}
                </div>
                <div className="fish-info-tag">
                  <i className="fa-solid fa-tag"></i>
                  <div className="fish-number">
                    Fish#{fishEntry.fishEntryId}
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
                {bids.slice(-5).map((bided, index) => {
                  if (bided.name) {
                    return (
                      <div className="bidding-history-info" key={index}>
                        <div className="bidding-time">
                          {new Date(bided.bidTime).toLocaleString()} &nbsp;{" "}
                          {/* Assuming you have a time property in bided */}
                        </div>
                        <div className="bidding-name-bidder">
                          {bided.name} bidded &nbsp;{" "}
                          {/* Assuming you have a bidderName property */}
                        </div>
                        <div className="bidding-price">${bided.bidAmount}</div>{" "}
                        {/* Assuming you have a price property */}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {fishEntry.status === 3 && (
              <div class="place-bid">
                <div class="place-bid-content">
                  <div class="place-bid-content-row1">
                    <div class="current-price-icon">
                      <i class="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div class="current-price-text">Current price</div>
                    <div class="current-price">{currentPrice}$</div>
                  </div>
                  <hr />
                  <div class="place-bid-content-row2">
                    <div class="increment">
                      <div class="increment-text">Increment</div>
                      <div class="increment-number">${stepPrice}</div>
                    </div>
                    <div class="multiple">x</div>
                    <div class="cen-div">
                      <div class="substract" onClick={handleDecrement}>
                        -
                      </div>
                      <div class="increment-bid-number">{increment}</div>
                      <div class="add" onClick={handleIncrement}>
                        +
                      </div>
                    </div>
                    <div class="equal">=</div>
                    <div class="total-bid-price">${totalBidPrice}</div>
                  </div>

                  <button class="place-bid-btn" onClick={bidding}>
                    Place bid at ${newPrice}
                  </button>
                </div>
              </div>
            )}

            {fishEntry.status === 2 && (
              <div className="auction-status-message">
                <i className="fa-solid fa-clock"></i> {/* Biểu tượng đồng hồ */}
                <p>The auction has not started yet.</p>
              </div>
            )}
            {fishEntry.status === 4 && winnerData ? (
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
            ) : fishEntry.status === 4 && winnerData === null ? (
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
            src="../../../assets/images/logo_png.png"
            alt=""
          />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src="../assets/images/Instagram.svg" alt="" />
          </div>
          <div className="facebook">
            <img src="../assets/images/Social Icons (1).svg" alt="" />
          </div>
          <div className="google">
            <img src="../assets/images/Vector.svg" alt="" />
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

export default FishAuctionMethod3;

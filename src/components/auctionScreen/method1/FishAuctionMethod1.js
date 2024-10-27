import React, { useEffect, useState } from "react";
import "./FishAuctionMethod1.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router";
import {
  handleFishEntryById,
  handleFixedPriceHistory,
  handleGetFishDetailById,
  handleGetFishImgById,
  handlePlaceFixedPrice,
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
      .withUrl("https://localhost:7124/fixedPriceSale") // URL của Hub trong ASP.NET Core
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
        // console.log(bids.slice(-1)[0]?.currentPrice);
        setCurrentPlaced(bidHistory.slice(-1)[0].numberOfBidders);
      })
      .catch((err) => console.log("Error while starting connection: " + err));
    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, [bidHistory, currentPlaced]);

  const placeABid = async () => {
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
          {auctionItem.status === 3
            ? `Ending in: ${new Date(auctionItem.endTime).toLocaleString()}`
            : auctionItem.status === 2
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
                <div className="place-bid-content-row3">
                  ${fishEntry.minPrice}
                </div>
                <button className="place-bid-btn" onClick={placeABid}>
                  Place a bid at ${fishEntry.minPrice}
                </button>
              </div>
            </div>
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

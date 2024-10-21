import React, { useEffect, useState } from "react";
import "./FishAuctionMethod3.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import {
  handleBidHistory,
  handleFishEntryById,
  handlePublicBidding,
} from "../../../axios/UserService";
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

const FishAuctionMethod3 = () => {
  const [searchParams] = useSearchParams();
  const [fishEntry, setFishEntry] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [bids, setBids] = useState([]);

  const getFishEntry = async () => {
    const entryId = searchParams.get("fishId");
    const res = await handleFishEntryById(entryId);
    setFishEntry(res.data);
    setStepPrice(res.data.increment);

    const his = await handleBidHistory(entryId);
    // Spread to flatten the array
    setBids((preBid) => [...preBid, ...his.data.$values]);
    // setCurrentPrice(his.data.$values.slice(-1)[0].currentPrice);
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
    const entryId = searchParams.get("fishId");
    const token = sessionStorage.getItem("token");
    const res = await handlePublicBidding(token, entryId, newPrice);
    console.log(res);
    getFishEntry();
  };
  //test để puhs
  return (
    <div className="auction-screen-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="fish-aucction-method3-content">
        <div className="fish-aucction-method3-content-row1">Auction#13</div>
        <div className="fish-aucction-method3-content-row2">
          Ending in: 4:13:03
        </div>
        <div className="fish-aucction-method3-content-row3">
          <div className="fish-auction-method3-content-row3-col1">
            <img
              className="main-fish-img"
              src="../../assets/images/login1.png"
              alt=""
            />
            <div className="fish-sub-img">
              {["body1.png", "login1.png", "login1.png", "login1.png"].map(
                (img, index) => (
                  <div
                    key={index}
                    className="fish-sub-img1"
                    data-src={`../../assets/images/${img}`}
                  >
                    <img src={`../../assets/images/${img}`} alt="" />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="fish-aucction-method3-content-row3-col2">
            <div className="fish-info">
              <div className="fish-info-row1">
                <div className="fish-info-name">Ca ngu</div>
                <div className="fish-info-notion">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              </div>
              <div className="fish-info-row2">
                <div className="fish-info-ending">Ending in: 23:13</div>
                <div className="fish-info-tag">
                  <i className="fa-solid fa-tag"></i>
                  <div className="fish-number">Fish#14</div>
                </div>
              </div>
              <div className="fish-info-row3">
                <div className="fish-info-weight">
                  <i className="fa-solid fa-weight-hanging"></i>
                  <div className="weight-number">1234 ram</div>
                </div>
                <div className="fish-info-length">
                  <i className="fa-solid fa-ruler"></i>
                  <div className="length-number">1234 mm</div>
                </div>
              </div>
              <div className="fish-info-row4">
                <div className="fish-info-gender">
                  <i className="fa-solid fa-venus-mars"></i>
                  <div className="gender-text">Female</div>
                </div>
                <div className="fish-info-age">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="age-text">22 months</div>
                </div>
              </div>
              <div className="fish-info-row5">
                <div className="fish-info-origin">
                  <i className="fa-solid fa-earth-americas"></i>
                  <div className="origin-text">Niigata, Japan</div>
                </div>
              </div>
            </div>
            <div className="bidding-history-background">
              <div className="bidding-history-content">
                {bids.slice(-5).map((bided, index) => {
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
                })}
              </div>
            </div>
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

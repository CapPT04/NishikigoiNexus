import React, { useEffect, useState } from "react";
import "./FishAuctionMethod3.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import {
  handleBidHistory,
  handleFishEntryById,
} from "../../../axios/UserService";
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

const FishAuctionMethod3 = () => {
  const [searchParams] = useSearchParams();
  const [fishEntry, setFishEntry] = useState("");
  const [bids, setBids] = useState([]);

  const getFishEntry = async () => {
    const entryId = searchParams.get("fishId");
    const res = await handleFishEntryById(entryId);
    setFishEntry(res.data);

    const his = await handleBidHistory(entryId);
    // Spread to flatten the array
    setBids((preBid) => [...preBid, ...his.data.$values]);
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
          console.log("Received bid placement: ", data);
          // Update bids list when new data is received
          setBids((prevBids) => [...prevBids, data]);
        });
      })
      .catch((err) => console.log("Error while starting connection: " + err));

    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, [bids]);

  useEffect(() => {
    console.log(bids);
  }, [bids]);
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
          <div className="fish-aucction-method3-content-row3-col1">
            <img
              className="main-fish-img"
              src="../assets/images/login1.png"
              alt=""
            />
            <div className="fish-sub-img">
              <div className="fish-sub-img1"></div>
              <div className="fish-sub-img1"></div>
              <div className="fish-sub-img1"></div>
              <div className="fish-sub-img1"></div>
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
            <div className="place-bid">
              <div className="place-bid-content">
                <div className="total-bid-price">
                  <div className="current-price">
                    <div className="current-price-text">Current Price</div>
                    <div className="current-price-number">$140</div>
                  </div>
                  <div className="addition-icon">+</div>
                  <div className="increment">
                    <div className="increment-text">Increment</div>
                    <div className="increment-number">$10</div>
                  </div>
                </div>
                <button className="place-bid-btn">Place bid at $150</button>
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

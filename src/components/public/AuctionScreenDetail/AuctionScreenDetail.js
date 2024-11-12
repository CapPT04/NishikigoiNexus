import React, { useEffect, useState } from "react";
import "./AuctionScreenDetail.scss";
import AuctionItemImg from "../../../assets/images/login.png";
import logo from "../../../assets/images/logo_png.png";
import instagramIcon from "../../../assets/images/Instagram.svg";
import facebookIcon from "../../../assets/images/Social Icons (1).svg";
import googleIcon from "../../../assets/images/Vector.svg";
import Navbar from "../../common/Navbar/Navbar";
import { handleGetAuctionDetailByIdApi } from "../../../axios/UserService";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router";

const AuctionScreenDetail = () => {
  const navigate = useNavigate();
  const auction = useLocation().state;

  const [auctionDetails, setAuctionDetails] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Change to false for 24-hour format
    });
  };

  const formatMoney = (value) => {
    // Convert the value to a string and take only the integer part
    let integerPart = String(Math.floor(Number(value)));
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted integer part
    return integerPart;
  };

  useEffect(() => {
    if (auction === null) {
      navigate("/auction")
    }
  }, [])



  useEffect(() => {
    const fetchAuctionsDetail = async () => {
      try {
        if (auction.auctionId != null) {
          const response = await handleGetAuctionDetailByIdApi(auction.auctionId);
          setAuctionDetails(response.data.$values);
        } else {
          navigate("/auction");
        }

      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchAuctionsDetail();
  }, []);

  console.log(auctionDetails);
  return (
    <div className="auction-screen-detail">
      <header className="header">
        <Navbar></Navbar>
      </header>

      <div className="auction-screen-detail-content">
        <div className="auction-screen-id">
          {auction?.auctionId ? `Auction#${auction.auctionId}` : "Auction ID not available"}
        </div>

        <div className="auction-screen-status">
          {auction?.status === 2 && (<span>Starting: {formatDate(auction.startDate)}</span>)}
          {auction?.status === 3 && "Bidding"}
          {auction?.status === 4 && "Ended"}
        </div>

        <div className="auction-screen-detail-content-row">
          {auctionDetails.map((auctionItem, index) => (
            <div
              className="fish-auction"
              key={index}
              onClick={() => {
                if (auctionItem.method === 1) {
                  navigate("/AuctionFishMethod1", {
                    state: { auctionItem, auctionId: auction.auctionId },
                  });
                } else if (auctionItem.method === 2) {
                  navigate("/AuctionFishMethod2", {
                    state: { auctionItem, auctionId: auction.auctionId },
                  });
                } else if (auctionItem.method === 3) {
                  navigate("/AuctionFishMethod3", {
                    state: { auctionItem, auctionId: auction.auctionId },
                  });
                } else if (auctionItem.method === 4) {
                  navigate("/AuctionFishMethod4", {
                    state: { auctionItem, auctionId: auction.auctionId },
                  });
                }
              }}
            >
              <div className="fish-auction-img">
                <img
                  src={
                    auctionItem.images.$values[0]?.imagePath !== "string"
                      ? auctionItem.images.$values[0]?.imagePath
                      : AuctionItemImg
                  }
                  alt={auctionItem.name || "Fish"}
                />
              </div>
              <div className="fish-auction-center-content">
                <div className="fish-auction-name">
                  {auctionItem.name || "Unknown Fish"}
                </div>
                <div className="fish-auction-ending-time">
                  {auctionItem.status === 2 && (
                    <span style={{ color: 'yellow' }}>
                      Starting: {formatDate(auctionItem.startTime)}
                    </span>
                  )}
                  {auctionItem.status === 3 && (
                    <span style={{ color: '#34a853' }}>
                      Ending: {formatDate(auctionItem.endTime)}
                    </span>
                  )}
                  {auctionItem.status === 4 && (
                    <span style={{ color: 'red' }}>
                      Ended
                    </span>
                  )}
                </div>


                <div className="fish-auction-price">
                  {formatMoney(auctionItem.min) || 0} VND
                </div>
              </div>
              <div className="fish-auction-left-content">
                <div className="fish-auction-method">
                  Method: &nbsp;
                  {auctionItem.method === 1 && "Fixed Price Sale"}
                  {auctionItem.method === 2 && "Secret Bid"}
                  {auctionItem.method === 3 && "Public Bid"}
                  {auctionItem.method === 4 && "Dutch Bid"}

                </div>
                <div className="fish-auction-size">
                  Size: {auctionItem.size || 0} mm
                </div>
                <div className="fish-auction-origin">
                  Origin: {auctionItem.origin || "Unknown Origin"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="logo-footer">
          <img className="logo-img-footer" src={logo} alt="Logo Footer" />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src={instagramIcon} alt="Instagram" />
          </div>
          <div className="facebook">
            <img src={facebookIcon} alt="Facebook" />
          </div>
          <div className="google">
            <img src={googleIcon} alt="Google" />
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

export default AuctionScreenDetail;

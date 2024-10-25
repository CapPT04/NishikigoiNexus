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
  const auction = useLocation().state;
  const [auctionDetails, setAuctionDetails] = useState([]);
  const navigate = useNavigate();
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

  console.log(auction.auctionId);
  useEffect(() => {
    const fetchAuctionsDetail = async () => {
      try {
        const response = await handleGetAuctionDetailByIdApi(auction.auctionId);

        setAuctionDetails(response.data.$values);
        console.log(auctionDetails);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchAuctionsDetail();
  }, [auction]);

<<<<<<< HEAD
  return (
    <div className="auction-screen-detail">
      <header className="header">
        <div className="navigation-bar">
          <div className="navigation-bar-left-content">
            <img className="logo" src={logo} alt="Logo" />
            <div className="project-name">Nishikigoi Nexus</div>
          </div>
          <div className="navigation-bar-right-content">
            <a className="home" href="#">
              HOME
            </a>
            <a className="auction" href="#">
              AUCTION
            </a>
            <a className="blog" href="#">
              BLOG
            </a>
            <a className="about" href="#">
              ABOUT
            </a>
            <div className="account">ACCOUNT</div>
          </div>
=======

    console.log(auction.auctionId);
    useEffect(() => {
        const fetchAuctionsDetail = async () => {
            try {
                const response = await handleGetAuctionDetailByIdApi(parseInt(auction.auctionId));

                setAuctionDetails(response.data.$values)
                console.log(auctionDetails);

            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        fetchAuctionsDetail();
    }, [auction])

    return (
        <div className="auction-screen-detail">
            <header className="header">
                <Navbar></Navbar>
            </header>

            <div className="auction-screen-detail-content">
                <div className="auction-screen-id">
                    Auction#{auction.auctionId}
                </div>
                <div className="auction-screen-status">
                    {auction.status === 2 && "Waiting"}
                    {auction.status === 3 && "Bidding"}
                    {auction.status === 4 && "Ended"}

                </div>

                <div className="auction-screen-detail-content-row">
                    {auctionDetails.map((auctionItem, index) => (
                        <div className="fish-auction" key={index}
                            onClick={() => {
                                if (auctionItem.method === 1) {
                                    navigate("/", {
                                        state: auctionItem
                                    });
                                } else if (auctionItem.method === 2) {
                                    navigate("/AuctionFishMethod2", {
                                        state: { auctionItem, auctionId: auction.auctionId }
                                    });
                                } else if (auctionItem.method === 3) {
                                    navigate("/AuctionFishMethod3");
                                } else if (auctionItem.method === 4) {
                                    navigate("/AuctionFishMethod4", {
                                        state: { auctionItem, auctionId: auction.auctionId }
                                    });
                                }
                            }}>
                            <div className="fish-auction-img">
                                <img
                                    src={auctionItem.images.$values[0]?.imagePath !== "string" ? auctionItem.images.$values[0]?.imagePath : AuctionItemImg}
                                    alt={auctionItem.name || "Fish"}
                                />
                            </div>
                            <div className="fish-auction-center-content">
                                <div className="fish-auction-name">{auctionItem.name || "Unknown Fish"}</div>
                                <div className="fish-auction-ending-time">Ending in: {formatDate(auctionItem.endTime)}</div>
                                <div className="fish-auction-price">${auctionItem.min || 0}</div>
                            </div>
                            <div className="fish-auction-left-content">
                                <div className="fish-auction-method">Method: {auctionItem.method || "Unknown Method"}</div>
                                <div className="fish-auction-size">Size: {auctionItem.size || 0} mm</div>
                                <div className="fish-auction-origin">Origin: {auctionItem.origin || "Unknown Origin"}</div>
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
>>>>>>> 7319196afd299df3c0f40873582f8cee66f6a186
        </div>
      </header>

      <div className="auction-screen-detail-content">
        <div className="auction-screen-id">Auction#{auction.auctionId}</div>
        <div className="auction-screen-status">
          {auction.status === 2 && "Waiting"}
          {auction.status === 3 && "Bidding"}
          {auction.status === 4 && "Ended"}
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
                  navigate("/method3");
                } else if (auctionItem.method === 4) {
                  navigate("/method4", {
                    state: auctionItem,
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
                  Ending in: {formatDate(auctionItem.endTime)}
                </div>
                <div className="fish-auction-price">
                  ${auctionItem.min || 0}
                </div>
              </div>
              <div className="fish-auction-left-content">
                <div className="fish-auction-method">
                  Method: {auctionItem.method || "Unknown Method"}
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

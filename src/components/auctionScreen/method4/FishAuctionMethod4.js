import { useState, useEffect } from "react";
import "./FishAuctionMethod4.scss";
import logo from "../../../assets/images/logo_png.png";
import instagramIcon from "../../../assets/images/Instagram.svg";
import facebookIcon from "../../../assets/images/Social Icons (1).svg";
import googleIcon from "../../../assets/images/Vector.svg";
import body1 from "../../../assets/images/body1.png";
import { useLocation } from "react-router";
import Navbar from "../../common/Navbar/Navbar";
import {
  handleGetFishImgById,
  handleFishEntryById,
  handlePlaceDutchAuctionBid,
  handleGetWinnerApi,
} from "../../../axios/UserService";
import Swal from "sweetalert2";
import startPriceIcon from "../../../assets/images/mintmark.svg";
import * as signalR from "@microsoft/signalr";

const FishAuctionMethod4 = () => {
  const location = useLocation();
  const [auctionItem, setAuctionItem] = useState(location.state.auctionItem);
  const auctionId = location.state.auctionId;
  const [currentPrice, setCurrentPrice] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const [amount, setAmount] = useState("");
  // console.log(amount);
  const [mainImage, setMainImage] = useState("");
  const [fishImage, setFishImage] = useState([]);
  const [highestPrice, setHighestPrice] = useState(auctionItem.highestprice);
  const [winnerData, setWinnerData] = useState(null);
  console.log(auctionItem);

  useEffect(() => {
    const fetchImageFish = async () => {
      try {
        setMainImage(auctionItem.images.$values[0]?.imagePath);
        const response = await handleGetFishImgById(
          auctionItem.images.$values[0].fishId
        );
        setFishImage(response.data.$values);
        // console.log(response.data.$values);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchImageFish();
  }, []);

  useEffect(() => {
    // Tạo kết nối đến SignalR Hub
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://localhost:7124/dutchAuctionHub?fishEntryId=${auctionItem.fishEntryId}`
      ) // URL ánh xạ trong app.MapHub
      .withAutomaticReconnect()
      .build();

    // Kết nối đến hub
    connection
      .start()
      .then(() => console.log("Connected to SignalR Hub"))
      .catch((err) => console.error("Connection failed: ", err));

    // Nhận sự kiện từ server
    connection.on("UpdateNewCostForDutchAuction", (newPrice) => {
      console.log("Received new price: ", newPrice);
      setHighestPrice(newPrice); // Cập nhật giá mới vào state
    });

    // Cleanup: đóng kết nối khi component bị unmounted
    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR Hub"));
    };
  }, []);

  const handlePlaceBidBtn = async () => {
    // Show confirmation dialog
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Bid",
      text: "Are you sure you want to place this bid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place it!",
      cancelButtonText: "No, cancel!",
    });

    // If the user confirmed, proceed to place the bid
    if (isConfirmed) {
      try {
        const response = await handlePlaceDutchAuctionBid(
          sessionStorage.getItem("token"),
          auctionItem.fishEntryId
        );
        console.log(response);

        if (response && response.status === 200) {
          Swal.fire({
            title: "Bid Placed!",
            text: "Your bid has been placed successfully.",
            icon: "success",
            confirmButtonText: "OK",
            background: "#f9f9f9", // Optional: Customize background color
            confirmButtonColor: "#3085d6", // Customize button color
            timer: 3000, // Optional: Auto-close after 3 seconds
          });
          setAuctionItem((prev) => ({ ...prev, status: 4 }));
        } else {
          Swal.fire({
            title: "Place bid failed!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error placing bid:", error);

        // Show an error notification
        Swal.fire({
          title: "Error!",
          text: "There was an error placing your bid. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Optional: Notify user that the bid was canceled
      Swal.fire({
        title: "Cancelled",
        text: "Your bid has not been placed.",
        icon: "info",
        confirmButtonText: "OK",
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
  // useEffect(() => {
  //     console.log("img:", fishImage);
  // })

  return (
    <div>
      <div className="header">
        <Navbar />
      </div>

      <div className="fish-aucction-method3-content">
        <div className="fish-aucction-method3-content-row1">
          Auction#{auctionId}
        </div>
        <div className="fish-aucction-method3-content-row3">
          <div className="fish-aucction-method3-content-row3-col1">
            <img
              className="main-fish-img"
              style={{ maxHeight: "650px" }}
              src={mainImage}
              alt="Main Fish"
            />
            <div className="fish-sub-img">
              {fishImage.map((img, index) => (
                <div
                  key={index}
                  className="fish-sub-img1"
                  onMouseEnter={() => setMainImage(img.imagePath)} // Hover to change main image
                  onMouseLeave={() => setMainImage(fishImage[0].imagePath)}
                >
                  <img src={img.imagePath} alt={`Fish ${index}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="fish-aucction-method3-content-row3-col2">
            <div className="fish-info">
              <div className="fish-info-row1">
                <div className="fish-info-name">{auctionItem.name}</div>
                <div className="fish-info-notion">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              </div>
              <div className="fish-info-row2">
                <div className="fish-info-ending">
                  Ending in: {formatDate(auctionItem.endTime)}
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
                  <div className="weight-number">{auctionItem.weight}</div>
                </div>
                <div className="fish-info-length">
                  <i className="fa-solid fa-ruler"></i>
                  <div className="length-number">{auctionItem.size}</div>
                </div>
              </div>
              <div className="fish-info-row4">
                <div className="fish-info-gender">
                  <i className="fa-solid fa-venus-mars"></i>
                  <div className="gender-text">
                    {auctionItem.gender === 1 && "Male"}
                    {auctionItem.gender === 2 && "Female"}
                  </div>
                </div>
                <div className="fish-info-age">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="age-text">{auctionItem.age}</div>
                </div>
              </div>
              <div className="fish-info-row5">
                <div className="fish-info-origin">
                  <i className="fa-solid fa-earth-americas"></i>
                  <div className="origin-text">{auctionItem.origin}</div>
                </div>
              </div>
            </div>
            {auctionItem.status === 3 ? (
              <div className="place-bid">
                <div className="place-bid-content">
                  <div className="place-bid-content-row1">
                    <div className="start-price-icon">
                      <img src={startPriceIcon} alt="" />
                    </div>
                    <div className="start-price-text">Start price</div>
                    <div className="start-price">${auctionItem.max}</div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row2">
                    <div className="current-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="current-price-text">
                      Current price: $
                      {highestPrice !== null ? `${highestPrice}` : ""}
                    </div>
                  </div>
                  <button
                    className="place-bid-btn"
                    onClick={() => handlePlaceBidBtn()}
                  >
                    Place bid at ${highestPrice}
                  </button>
                </div>
              </div>
            ) : auctionItem.status === 2 ? (
              <div className="status-message">
                <p>The auction has not started yet.</p>
              </div>
            ) : auctionItem.status === 4 && winnerData ? (
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
                    {formatDate(winnerData.endDate)}
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
            src={logo}
            alt="Nishikigoi Nexus Logo"
          />
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

export default FishAuctionMethod4;

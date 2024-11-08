import { useState, useEffect } from "react";
import "./FishAuctionMethod2.scss";
import logo from "../../../assets/images/logo_png.png";
import instagramIcon from "../../../assets/images/Instagram.svg";
import facebookIcon from "../../../assets/images/Social Icons (1).svg";
import googleIcon from "../../../assets/images/Vector.svg";
import body1 from "../../../assets/images/body1.png";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../common/Navbar/Navbar";
import {
  handleGetFishImgById,
  handleGetHistoryOfSecretBidApi,
  handlePlaceSecretBidApi,
  handleGetWinnerApi,
  handleGetAuctionDetailByIdApi,
  handleCheckEnrollApi,
  handleEnrollApi,
  handleGetFishEntryDepositApi,
} from "../../../axios/UserService";
import Swal from "sweetalert2";
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Navigate } from "react-router";
import { faArrowUpFromWaterPump } from "@fortawesome/free-solid-svg-icons";

const FishAuctionMethod2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auctionItem, setAuctionItem] = useState(location.state.auctionItem);
  const auctionId = location.state.auctionId;
  const [historyOfSecretBid, setHistoryOfSecretBid] = useState([]);
  const [numberOfBidders, setNumberOfBidders] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const [amount, setAmount] = useState("");
  // console.log(amount);
  const [mainImage, setMainImage] = useState("");
  const [fishImage, setFishImage] = useState([]);
  // console.log(sessionStorage.getItem("token"));
  const [winnerData, setWinnerData] = useState(null);
  const [auctionDetails, setAuctionDetails] = useState();
  const [checkEnroll, setCheckEnroll] = useState(false);
  const [fishEntryDeposit, setFishEntryDeposit] = useState(0);
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

  const handleEnrollBtn = async () => {
    // Show confirmation dialog with deposit amount

    const result = await Swal.fire({
      title: "Confirm Enrollment",
      text: `To enroll in this auction, a deposit of ${formatMoney(
        fishEntryDeposit
      )} VND is required. Do you wish to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Enrolling...",
          text: "Please wait while we enroll you in the auction.",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await handleEnrollApi(
          sessionStorage.getItem("token"),
          auctionItem.fishEntryId
        );
        console.log(response);

        if (response && response.status === 200) {
          // Success notification
          Swal.fire({
            icon: "success",
            title: "Enrollment Successful!",
            text: `You have been successfully enrolled with a ${formatMoney(
              fishEntryDeposit
            )} VND deposit.`,
          }).then(() => {
            // Reload the page after the user clicks "OK" on the success message
            window.location.reload(); // This will reload the current page
          });
          // Update component state (if needed)
        } else if (response && response.status === 400) {
          // Handle insufficient balance error
          Swal.fire({
            icon: "error",
            title: "Enrollment Failed",
            text: "You do not have enough balance to enroll! Please deposit money into your account.",
            showCancelButton: true,
            confirmButtonText: "Go to Deposit Page",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to deposit page
              if (JSON.parse(sessionStorage.getItem("user")).Role === "1") {
                navigate("/user/UserWallet");
              } else if (
                JSON.parse(sessionStorage.getItem("user")).Role === "2"
              ) {
                navigate("/breeder/UserWallet");
              }
            }
          });
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: "There was an error enrolling in the auction. Please try again later.",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Enrollment Canceled",
        text: "You chose not to proceed with the enrollment.",
      });
    }
  };

  useEffect(() => {
    const fishEntryDeposit = async () => {
      try {
        const response = await handleGetFishEntryDepositApi(
          auctionItem.fishEntryId
        );
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
        const response = await handleCheckEnrollApi(
          sessionStorage.getItem("token"),
          auctionItem.fishEntryId
        );
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
  }, [auctionItem.fishEntryId]);

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
    const fetchHistoryOfSecretBid = async () => {
      try {
        // console.log(auctionItem.fishEntryId);
        const response = await handleGetHistoryOfSecretBidApi(
          auctionItem.fishEntryId
        );
        // console.log(response.data.$values[0]);
        setNumberOfBidders(response.data.$values[0].numberOfBidders);
        // Cập nhật state với 5 phần tử mới nhất
        setHistoryOfSecretBid(response.data.$values.slice(-5));
        // console.log(historyOfSecretBid);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchHistoryOfSecretBid();
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${process.env.REACT_APP_LINK_REALTIME_SERVER}secretBidHub?fishEntryId=${auctionItem.fishEntryId}`
      )
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
        // Lắng nghe sự kiện ReceiveHistoryOfBids
        connection.on("ReceiveBidPlacement", (newBid) => {
          // Cập nhật lịch sử đấu giá với bid mới nhận được
          console.log("Received new bid: ", newBid);
          setHistoryOfSecretBid((prevHistory) => [...prevHistory, newBid]);
          // Cập nhật số lượng người tham gia
          setNumberOfBidders((prevCount) => newBid.numberOfBidders);
        });
        connection.on("AuctionEnded", (data) => {
          //reload page when auction end
          window.location.reload();
        });
        connection.on("AuctionStart", (data) => {
          //reload page when auction start
          window.location.reload();
        });
      })
      .catch((err) => console.log("Error while starting connection: " + err));

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR Hub"));
    };
  }, []);

  const handlePlaceSecretBidBtn = async () => {
    console.log("adsa");

    if (sessionStorage.getItem("token") === null) {
      console.log(sessionStorage.getItem("token"));
      navigate("/login");
      return;
    }
    Swal.fire({
      title: "Place Secret Bid",
      text: `Are you sure you want to place a bid of ${formatMoney(
        amount
      )} VND?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745", // Customize button color
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, place bid!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await handlePlaceSecretBidApi(
            sessionStorage.getItem("token"),
            amount,
            auctionItem.fishEntryId
          );
          const responseHisOfSecretBid = await handleGetHistoryOfSecretBidApi(
            auctionItem.fishEntryId
          );

          console.log(response);

          if (response && response.status === 200) {
            Swal.fire({
              title: "Bid Placed!",
              text: "Your bid has been successfully placed.",
              icon: "success",
              confirmButtonColor: "#28a745",
            });
          } else if (response.status === 400) {
            Swal.fire({
              title: "Place bid failed!",
              icon: "error",
              confirmButtonColor: "#dc3545",
            });
          }
        } catch (error) {
          console.error("Error placing bid:", error);
          Swal.fire({
            title: "Error",
            text: "There was an issue placing your bid. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc3545",
          });
        }
      } else {
        Swal.fire("Cancelled", "Your bid was not placed.", "info");
      }
    });
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
              style={{ maxHeight: "65" }}
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

            <div className="bidding-history-background">
              <div className="bidding-history-content">
                {historyOfSecretBid.map((bid, index) => (
                  <div className="bidding-history-info" key={index}>
                    <div className="bidding-time">
                      {formatDate(bid.bidTime)} &nbsp;
                    </div>
                    <div className="bidding-name-bidder">
                      {" "}
                      An anonymous person placed a bid
                    </div>
                  </div>
                ))}
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
                    <div className="number-of-bidders">{numberOfBidders}</div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row2">
                    <div className="min-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="min-price-text">
                      Min price: {formatMoney(auctionItem.min)} VND
                    </div>
                  </div>

                  {auctionItem.status === 3 && checkEnroll && (
                    <input
                      type="number"
                      className="place-bid-content-row3"
                      min={auctionItem.min}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                  )}

                  {checkEnroll ? (
                    <button
                      className="place-bid-btn"
                      onClick={handlePlaceSecretBidBtn}
                      disabled={auctionItem.status === 2}
                    >
                      {auctionItem.status === 2
                        ? "The auction has not started."
                        : `Place bid at ${formatMoney(amount)} VND`}
                    </button>
                  ) : (
                    <button
                      className="enroll-bid"
                      onClick={() => handleEnrollBtn()}
                    >
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
                    {winnerData.amount} VND
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

export default FishAuctionMethod2;

import { useState, useEffect } from "react";
import "./FishAuctionMethod4.scss";
import logo from "../../../assets/images/logo_png.png";
import instagramIcon from "../../../assets/images/Instagram.svg";
import facebookIcon from "../../../assets/images/Social Icons (1).svg";
import googleIcon from "../../../assets/images/Vector.svg";
import body1 from "../../../assets/images/body1.png";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../common/Navbar/Navbar";
import { Navigate } from "react-router";

import {
  handleGetFishImgById,
  handleGetHistoryOfSecretBidApi,
  handlePlaceSecretBidApi,
  handleGetWinnerApi,
  handleGetAuctionDetailByIdApi,
  handleCheckEnrollApi,
  handleEnrollApi,
  handleGetFishEntryDepositApi,
  handlePlaceDutchAuctionBid,
  handleFishEntryById,
  handleGetFishDetailById,
} from "../../../axios/UserService";
import Swal from "sweetalert2";
import startPriceIcon from "../../../assets/images/mintmark.svg";
import * as signalR from "@microsoft/signalr";

const FishAuctionMethod4 = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [auctionItem, setAuctionItem] = useState(location.state?.auctionItem);
  const [fishEntryId, setFishEntryId] = useState(location.state?.fishHomePage?.fishEntryId)

  const auctionId = location.state?.auctionId;
  const [currentPrice, setCurrentPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [fishImage, setFishImage] = useState([]);
  const [winnerData, setWinnerData] = useState(null);
  const [checkEnroll, setCheckEnroll] = useState(false);
  const [fishEntryDeposit, setFishEntryDeposit] = useState(0);
  const [fishEntry, setFishEntry] = useState({});
  const [highestPrice, setHighestPrice] = useState(fishEntry.highestprice);
  const [fishInfor, setFishInfor] = useState({});

  // format
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  useEffect(() => {
    console.log("auctionitem: ", auctionItem);
    console.log("fishentryid: ", fishEntryId);
    if (!auctionItem && !fishEntryId) {
      // navigate("/auction");
    }
  }, [auctionItem, fishEntryId]);
  useEffect(() => {
    const GetFishEntryById = async () => {
      try {
        const response = await handleFishEntryById(auctionItem.fishEntryId);
        if (response && response.status === 200) {
          setFishEntry(response.data);
        } else if (response.status === 400) {
          console.log("error when call api GetFishEntryById");
        }
      } catch (error) {
        console.error("Error checking gt fish entry deposite status:", error);
      }
    };
    GetFishEntryById();
  }, [auctionItem]);

  useEffect(() => {
    const fetchGetFishInfor = async () => {
      try {
        const response = await handleGetFishDetailById(fishEntry.fishId);
        setFishInfor(response.data);
      } catch (error) {
        console.error("Error checking gt fish entry deposite status:", error);
      }
    };
    fetchGetFishInfor();
  }, [fishEntry]);
  useEffect(() => {
    const fishEntryDeposit = async () => {
      try {
        const response = await handleGetFishEntryDepositApi(
          fishEntry.fishEntryId
        );
        if (response && response.status === 200) {
          setFishEntryDeposit(response.data);
        } else if (response.status === 400) {
          setFishEntryDeposit(0);
        }
      } catch (error) {
        console.error("Error checking get fish entry deposite status:", error);
      }
    };
    fishEntryDeposit();
  }, [fishEntry]);
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        const response = await handleCheckEnrollApi(
          sessionStorage.getItem("token"),
          fishEntry.fishEntryId
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
  }, [fishEntry]);

  useEffect(() => {
    const fetchImageFish = async () => {
      try {
        const response = await handleGetFishImgById(
          fishEntry.fishId
        );
        setMainImage(response.data.$values[0]?.imagePath);
        setFishImage(response.data.$values);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchImageFish();
  }, [fishEntry, fishInfor]);

  useEffect(() => {
    // Tạo kết nối đến SignalR Hub
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${process.env.REACT_APP_LINK_REALTIME_SERVER}dutchAuctionHub?fishEntryId=${fishEntry.fishEntryId}`
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
    connection.on("AuctionEnded", (data) => {
      //reload page when auction end
      window.location.reload();
    });
    connection.on("AuctionStart", (data) => {
      //reload page when auction start
      window.location.reload();
    });

    // Cleanup: đóng kết nối khi component bị unmounted
    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR Hub"));
    };
  }, []);

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
          fishEntry.fishEntryId
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
          }).then(() => {
            // Reload the page after the user clicks "OK" on the success message
            window.location.reload(); // This will reload the current page
          });
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
          fishEntry.fishEntryId
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
                <div className="fish-info-name">{fishInfor?.fishName}</div>
                <div className="fish-info-notion">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </div>
              </div>
              <div className="fish-info-row2">
                <div className="fish-info-ending">
                  Ending in: {formatDate(fishEntry?.endDate)}
                </div>
                <div className="fish-info-tag">
                  <i className="fa-solid fa-tag"></i>
                  <div className="fish-number">
                    Fish#{fishEntry?.fishEntryId}
                  </div>
                </div>
              </div>
              <div className="fish-info-row3">
                <div className="fish-info-weight">
                  <i className="fa-solid fa-weight-hanging"></i>
                  <div className="weight-number">{fishInfor?.weight}</div>
                </div>
                <div className="fish-info-length">
                  <i className="fa-solid fa-ruler"></i>
                  <div className="length-number">{fishInfor?.size}</div>
                </div>
              </div>
              <div className="fish-info-row4">
                <div className="fish-info-gender">
                  <i className="fa-solid fa-venus-mars"></i>
                  <div className="gender-text">
                    {fishInfor?.gender === 1 && "Male"}
                    {fishInfor?.gender === 2 && "Female"}
                  </div>
                </div>
                <div className="fish-info-age">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="age-text">{fishInfor?.age}</div>
                </div>
              </div>
              <div className="fish-info-row5">
                <div className="fish-info-origin">
                  <i className="fa-solid fa-earth-americas"></i>
                  <div className="origin-text">{fishInfor?.origin}</div>
                </div>
              </div>
            </div>
            {(fishEntry.status === 3 || fishEntry.status === 2) && (
              <div className="place-bid">
                <div className="place-bid-content">
                  <div className="place-bid-content-row1">
                    <div className="start-price-icon">
                      <i class="fa-solid fa-maximize"></i>
                    </div>
                    <div className="start-price-text">Start price</div>
                    <div className="start-price">
                      {formatMoney(fishEntry.maxPrice)} VND
                    </div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row1">
                    <div className="start-price-icon">
                      <i class="fa-solid fa-minimize"></i>
                    </div>
                    <div className="start-price-text">Min price</div>
                    <div className="start-price">
                      {formatMoney(fishEntry.minPrice)} VND
                    </div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row2">
                    <div className="current-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="current-price-text">
                      Current price:{" "}
                      {highestPrice !== undefined
                        ? formatMoney(highestPrice)
                        : formatMoney(fishEntry.maxPrice)}{" "}
                      VND
                    </div>
                  </div>

                  {checkEnroll ? (
                    <button
                      className="place-bid-btn"
                      onClick={() => handlePlaceBidBtn()}
                    >
                      {fishEntry.status === 2
                        ? "The auction has not started."
                        : `Place bid at ${formatMoney(highestPrice) ??
                        formatMoney(fishEntry.maxPrice)
                        } VND`}
                    </button>
                  ) : (
                    <button
                      className="enroll-bid"
                      onClick={() => handleEnrollBtn()}
                      style={{ background: '#4CAF50' }}
                    >
                      Enroll with {formatMoney(fishEntryDeposit)} VND deposit
                    </button>
                  )}
                </div>
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
                    {formatMoney(winnerData.amount)} VND
                  </div>
                  <div className="place-bid-content-row3-status4">
                    {formatDate(winnerData.endDate)}
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

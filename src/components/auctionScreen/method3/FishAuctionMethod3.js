import React, { useEffect, useState } from "react";
import "./FishAuctionMethod3.scss";
import logo from "../../../assets/images/logo_png.png"; // Adjust based on your file structure
import instagramIcon from "../../../assets/images/Instagram.svg";
import facebookIcon from "../../../assets/images/Social Icons (1).svg";
import googleIcon from "../../../assets/images/Vector.svg";
import Navbar from "../../common/Navbar/Navbar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  handleBidHistory,
  handleFishEntryById,
  handleGetFishDetailById,
  handleGetFishImgById,
  handleGetWinnerApi,
  handlePublicBidding,
  handleCheckEnrollApi,
  handleEnrollApi,
  handleGetFishEntryDepositApi,
  handleGetAuctionByIdApi,
} from "../../../axios/UserService";
import * as signalR from "@microsoft/signalr";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const FishAuctionMethod3 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const entryId =
    location.state?.auctionItem?.fishEntryId ||
    location.state?.fishHomePage?.fishEntryId;

  const [auction, setAuction] = useState("");
  const [fishEntry, setFishEntry] = useState("");
  const [fishInfo, setFishInfo] = useState("");
  const [fishImgs, setFishImgs] = useState([]);
  const [mainImage, setMainImage] = useState(""); // For handling the main image
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [bids, setBids] = useState([]);
  const [highestPrice, setHighestPrice] = useState(null);
  const [winnerData, setWinnerData] = useState("");
  const [checkEnroll, setCheckEnroll] = useState(false);
  const [fishEntryDeposit, setFishEntryDeposit] = useState(0);

  //format to display
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

  const getInfoReady = async () => {
    // console.log("entryId: ", entryId);
    if (entryId) {
      const res = await handleFishEntryById(entryId);
      setFishEntry(res.data);
      // console.log(res.data);
      setStepPrice(res.data.increment);
      setCurrentPrice(res.data.minPrice);
      const resFish = await handleGetFishDetailById(res.data.fishId);
      setFishInfo(resFish.data);
      const resImgs = await handleGetFishImgById(resFish.data.fishId);
      setFishImgs(resImgs.data.$values);
      setMainImage(resImgs.data.$values[0]?.imagePath || "");
      const resAuction = await handleGetAuctionByIdApi(res.data.auctionId);
      setAuction(resAuction.data);

      const his = await handleBidHistory(entryId);
      // console.log(his.data.$values);
      // Spread to flatten the array
      // setBids((preBid) => [...preBid, his.data.$values]);
      setBids(his.data.$values);
      // setCurrentPrice(his.data.$values.slice(-1)[0]?.currentPrice);

      //get deposit
      try {
        const response = await handleGetFishEntryDepositApi(
          res.data.fishEntryId
        );
        if (response && response.status === 200) {
          setFishEntryDeposit(response.data);
        } else if (response.status === 400) {
          console.log("err:", response.data);
          setFishEntryDeposit(0);
        }
      } catch (error) {
        console.error("Error checking gt fish entry deposite status:", error);
      }

      //check enroll status
      try {
        const response = await handleCheckEnrollApi(
          Cookies.get("token"),
          res.data.fishEntryId
        );
        if (response && response.status === 200) {
          setCheckEnroll(true);
        } else if (response.status === 400) {
          setCheckEnroll(false);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
        setCheckEnroll(false);
      }
    } else {
      navigate("/AuctionDetails");
      return;
    }
  };
  // const getFishEntryDeposit = async () => {
  //   try {
  //     const response = await handleGetFishEntryDepositApi(
  //       fishEntry.fishEntryId
  //     );
  //     if (response && response.status === 200) {
  //       setFishEntryDeposit(response.data);
  //     } else if (response.status === 400) {
  //       console.log("err:", response.data);
  //       setFishEntryDeposit(0);
  //     }
  //   } catch (error) {
  //     console.error("Error checking gt fish entry deposite status:", error);
  //   }
  // };

  useEffect(() => {
    getInfoReady();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleEnrollBtn = async () => {
    if (!Cookies.get("token") || jwtDecode(Cookies.get("token")).Role != 1) {
      navigate("/login");
      return;
    }
    // Show confirmation dialog with deposit amount
    const result = await Swal.fire({
      title: "Confirm Enrollment",
      text: `To enroll in this auction, a deposit of ${fishEntryDeposit} VND is required. Do you wish to proceed?`,
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
          Cookies.get("token"),
          fishEntry.fishEntryId
        );
        // console.log(response);
        if (response && response.status === 200) {
          // Success notification
          Swal.fire({
            icon: "success",
            title: "Enrollment Successful!",
            text: `You have been successfully enrolled with a ${fishEntryDeposit} VND deposit.`,
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
              const user = Cookies.get("user")
                ? JSON.parse(Cookies.get("user"))
                : null;
              if (user.Role === "1") {
                navigate("/user/UserWallet");
              } else if (user.Role === "2") {
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

  // useEffect(() => {
  //   const checkEnrollmentStatus = async () => {
  //     try {
  //       const response = await handleCheckEnrollApi(
  //         Cookies.get("token"),
  //         fishEntry.fishEntryId
  //       );
  //       console.log(response);
  //       console.log(Cookies.get("token"));
  //       console.log(response.status);
  //       if (response && response.status === 200) {
  //         setCheckEnroll(true);
  //       } else if (response.status === 400) {
  //         setCheckEnroll(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking enrollment status:", error);
  //       setCheckEnroll(false);
  //     }
  //   };
  //   checkEnrollmentStatus();
  // }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${process.env.REACT_APP_LINK_REALTIME_SERVER}publicBidHub?fishEntryId=${fishEntry.fishEntryId}`
      ) // URL của Hub trong ASP.NET Core

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
        connection.on("AuctionEnded", (data) => {
          //reload page when auction end
          console.log("ReceiveAuctionEnded");
          window.location.reload();
        });
        connection.on("AuctionStart", (data) => {
          //reload page when auction start
          console.log("ReceiveAuctionStart");
          window.location.reload();
        });
        setCurrentPrice(bids.slice(-1)[0].currentPrice);
      })
      .catch((err) => console.log("Error while starting connection: " + err));
    // Cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, [bids, currentPrice]);

  const handleIncrement = () => {
    setIncrement((prevIncrement) => Math.min(prevIncrement + 1, 5)); // Limit to max of 5
  };

  const handleDecrement = () => {
    setIncrement((prevIncrement) => Math.max(prevIncrement - 1, 1)); // Limit to min of 1
  };

  const totalBidPrice = stepPrice * increment;
  const newPrice = currentPrice + totalBidPrice;
  const bidding = async () => {
    if (Cookies.get("token") === null) {
      // console.log(Cookies.get("token"));
      navigate("/login");
      return;
    }
    const token = Cookies.get("token");
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
  };
  const buyItNow = async () => {
    if (Cookies.get("token") === null) {
      // console.log(Cookies.get("token"));
      navigate("/login");
      return;
    }
    const result = await Swal.fire({
      title: "Confirm Buy-It-Now",
      text: `To buy-it-now this fish, you need to paid ${formatMoney(
        fishEntry.maxPrice
      )} VND. Do you wish to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      const token = Cookies.get("token");
      // console.log(fishEntry.maxPrice);
      const res = await handlePublicBidding(token, entryId, fishEntry.maxPrice);
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
    }
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
        <div className="fish-aucction-method3-content-row1">
          Auction#{fishEntry.auctionId}
        </div>
        <div className="fish-aucction-method3-content-row2">
          {auction.status === 2 && (
            <span style={{ color: "#007bff" }}>
              {" "}
              {/* Màu xanh lam */}
              Starting: {formatDate(auction.startDate)}
            </span>
          )}
          {auction.status === 3 && (
            <span style={{ color: "#34a853" }}>Bidding</span>
          )}
          {auction.status === 4 && <span style={{ color: "red" }}>Ended</span>}
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
                  Ends at:{" "}
                  {fishEntry.endDate
                    ? new Date(fishEntry.endDate).toLocaleString()
                    : ""}
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
                          A member bidded &nbsp;{" "}
                          {/* Assuming you have a bidderName property */}
                        </div>
                        <div className="bidding-price">
                          {formatMoney(bided.bidAmount)} VND
                        </div>{" "}
                        {/* Assuming you have a price property */}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {(fishEntry.status === 3 || fishEntry.status === 2) && (
              <div className="place-bid">
                <div className="place-bid-content">
                  <div className="place-bid-content-row1">
                    <div className="current-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="current-price-text">Current price</div>
                    <div className="current-price">
                      {formatMoney(currentPrice)} VND
                    </div>
                  </div>
                  <div className="place-bid-content-row5">
                    <div className="current-price-icon">
                      <i className="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                    <div className="current-price-text">Buy-It-Now price</div>
                    <div className="current-price">
                      {formatMoney(fishEntry.maxPrice)} VND
                    </div>
                  </div>
                  <hr />
                  <div className="place-bid-content-row2">
                    <div className="increment">
                      <div className="increment-text">Increment</div>
                      <div className="increment-number">
                        {formatMoney(stepPrice)} VND
                      </div>
                    </div>
                    <div className="multiple">x</div>
                    <div className="cen-div">
                      <div className="substract" onClick={handleDecrement}>
                        -
                      </div>
                      <div className="increment-bid-number">{increment}</div>
                      <div className="add" onClick={handleIncrement}>
                        +
                      </div>
                    </div>
                    <div className="equal">=</div>
                    <div className="total-bid-price">
                      {formatMoney(totalBidPrice)} VND
                    </div>
                  </div>

                  {checkEnroll ? (
                    <>
                      <button className="place-bid-btn" onClick={bidding}>
                        {fishEntry.status === 2
                          ? "The auction has not started."
                          : `Place bid at ${formatMoney(newPrice)} VND`}
                      </button>
                      <button
                        className="buy-now-btn"
                        onClick={buyItNow}
                        style={{
                          display: fishEntry.status !== 3 ? "none" : "",
                        }}
                      >
                        Buy-It-Now with {formatMoney(fishEntry.maxPrice)} VND
                      </button>
                    </>
                  ) : (
                    <button
                      className="enroll-bid"
                      onClick={() => handleEnrollBtn()}
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
          <img className="logo-img-footer" src={logo} alt="" />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src={instagramIcon} alt="" />
          </div>
          <div className="facebook">
            <img src={facebookIcon} alt="" />
          </div>
          <div className="google">
            <img src={googleIcon} alt="" />
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

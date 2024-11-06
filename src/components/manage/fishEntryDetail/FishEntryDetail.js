import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./FishEntryDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import {
  handleGetRequestDetail,
  handleUserById,
} from "../../../axios/UserService";

const FishEntryDetail = () => {
  const navigate = useNavigate();
  const koi = useLocation().state;
  const [breeder, setBreeder] = useState("");
  const [bidder, setBidder] = useState("");
  const [request, setRequest] = useState("");

  const statusName = ["Unknown", "Preparing", "Waitting", "Bidding", "Ended"];
  const method = [
    "Fixed Price Sale",
    "Secret Bid",
    "Public Bid",
    "Dutch Auction",
  ];

  //format to display
  const formatMoney = (value) => {
    // Ensure the value is a number or a string
    let [integerPart, decimalPart] = String(value).split(".");
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted number with the decimal part (if present)
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };

  const getInfo = async () => {
    if (koi) {
      const resReq = await handleGetRequestDetail(koi.requestId);
      setRequest(resReq.data);
      // console.log(resReq.data);
      const res = await handleUserById(resReq.data.createBy);
      setBreeder(res.data);
      const resBid = await handleUserById(koi.highestBidder);
      setBidder(resBid.data);
    }
  };

  useEffect(() => {
    if (!koi) {
      navigate("/Manager/ManageFishEntry");
    } else {
      getInfo();
    }
  }, [koi]);

  if (!koi) {
    return navigate("/Manager/ManageFishEntry"); // You can return a spinner or message if desired
  }

  return (
    <div className="blog-detail-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="fish-detail-content">
            <div className="fish-detail-content-row1">
              <div className="status">Status: {statusName[koi.status]}</div>
              {/* <select name="" id="" className="set-status">
            <option value="">Set status &nbsp;&nbsp; v</option>
          </select> */}
            </div>
            <div className="fish-detail-content-row2">Fish Entry Detail</div>
            <div className="fish-detail-content-row3">
              Create date: {new Date(request.createDate).toLocaleString()}
            </div>
            <div className="fish-detail-content-row4">
              <label for="create-by-input" className="create-by-label">
                Create By
              </label>
              <input
                type="text"
                className="create-by-input"
                value={breeder.firstName + " " + breeder.lastName}
                disabled={true}
              />
            </div>
            <div className="fish-detail-content-row5">
              <div className="update-by">
                <label for="update-by-input" className="update-by-label">
                  Fish ID
                </label>
                <input
                  type="text"
                  className="update-by-input"
                  value={koi.fishId}
                  disabled={true}
                />
              </div>
              <div className="last-update">
                {" "}
                <label for="last-update-input" className="last-update-label">
                  Auction ID
                </label>
                <input
                  type="datetime"
                  className="last-update-input"
                  value={
                    koi.auctionId ? koi.auctionId : "Not joined any auction yet"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row6">
              <div className="fish-name">
                <label for="fish-name-input" className="fish-name-label">
                  Auction Method
                </label>
                <input
                  type="text"
                  className="fish-name-input"
                  value={method[koi.auctionMethod - 1]}
                  disabled={true}
                />
              </div>
              <div className="origin">
                <label for="origin-input" className="origin-label">
                  Increment
                </label>
                <input
                  type="text"
                  className="origin-input"
                  value={
                    koi.increment
                      ? formatMoney(koi.increment) + " VND"
                      : "0 VND"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row7">
              <div className="shape">
                <label for="shape-input" className="shape-label">
                  Min Price
                </label>
                <input
                  type="text"
                  className="shape-input"
                  value={
                    koi.minPrice ? formatMoney(koi.minPrice) + " VND" : "0 VND"
                  }
                  disabled={true}
                />
              </div>
              <div className="size">
                <label for="size-input" className="size-label">
                  Max Price
                </label>
                <input
                  type="text"
                  className="origin-input"
                  value={
                    koi.auctionMethod === 4
                      ? formatMoney(koi.maxPrice) + " VND"
                      : ""
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row8">
              <div className="gender">
                <label for="gender-input" className="gender-label">
                  Expected Date
                </label>
                <input
                  type="text"
                  className="gender-input"
                  value={new Date(koi.expectedDate).toLocaleString()}
                  disabled={true}
                />
              </div>
              <div className="age">
                <label for="age-input" className="age-label">
                  Start Date
                </label>
                <input
                  type="text"
                  className="age-input"
                  value={
                    koi.startDate
                      ? new Date(koi.startDate).toLocaleString()
                      : "Not start yet"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row9">
              <div className="weight">
                <label for="weight-input" className="weight-label">
                  End Date
                </label>
                <input
                  type="text"
                  className="weight-input"
                  value={
                    koi.endDate
                      ? new Date(koi.endDate).toLocaleString()
                      : "Not Ended yet"
                  }
                  disabled={true}
                />
              </div>
              <div className="sold-price">
                <label for="sold-price-input" className="sold-price-label">
                  Request Fee
                </label>
                <input
                  type="text"
                  className="sold-price-input"
                  value={`${formatMoney(request.fee)} VND`}
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row9">
              <div className="weight">
                <label for="weight-input" className="weight-label">
                  Highest Bidder
                </label>
                <input
                  type="text"
                  className="weight-input"
                  value={koi.highestBidder ? koi.highestBidder : ""}
                  disabled={true}
                />
              </div>
              <div className="sold-price">
                <label for="sold-price-input" className="sold-price-label">
                  Highest Price
                </label>
                <input
                  type="text"
                  className="sold-price-input"
                  value={
                    koi.highestPrice
                      ? formatMoney(koi.highestPrice) + " VND"
                      : ""
                  }
                  disabled={true}
                />
              </div>
            </div>

            <div className="fish-detail-content-row10">
              {/* <button className="update-btn">Update</button>
          <button className="cancel-btn">Cancel</button> */}
            </div>
            {/* enroll */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishEntryDetail;

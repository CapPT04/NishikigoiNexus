import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import "./RequestDetail.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleGetFishEntry,
  handleGetRequestDetail,
  handlePayFeeAPI,
  handleUserById,
} from "../../../axios/UserService";

const RequestDetail = () => {
  const navigate = useNavigate();
  const [myRequest, setMyRequest] = useState("");
  const [fishEntry, setFishEntry] = useState("");
  const [bidder, setBidder] = useState("");
  const [searchParams] = useSearchParams();
  const statusName = ["Processing", "Paying", "Approved", "Denied"];
  const method = ["FixedPriceSale", "SecretBid", "PublicBid", "DutchAuction"];
  const reqID = searchParams.get("id");
  const token = sessionStorage.getItem("token");

  //-------get info----------
  const getInfoRequestDetail = async () => {
    try {
      //   console.log("before save");
      const resRequest = await handleGetRequestDetail(reqID);
      const resFish = await handleGetFishEntry(reqID);
      const user = await handleUserById(resFish.data.highestBidder);
      console.log(resRequest.data);
      setMyRequest(resRequest.data);
      setFishEntry(resFish.data);
      setBidder(user.data);
    } catch (error) {
      console.error("Error fetching request detail:", error);
    }
  };
  //------ pay fee----------
  const handlePayFee = async () => {
    // implement your payment logic here
    // console.log("pay");
    console.log(token);
    const link = await handlePayFeeAPI(token, reqID);
    // console.log(link);
    window.location.href = link.data;
  };
  //-----cancel----
  const handleCancel = async () => {
    console.log("cancel");
  };

  useEffect(() => {
    getInfoRequestDetail();
  }, []);
  //   useEffect(() => {
  //     console.log("myRequest has been updated:", myRequest);
  //   }, [myRequest]);
  return (
    <div className="request-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div className="request-detail-content">
          <div className="request-detail-content-row1">
            <div className="status">
              Status: {statusName[myRequest.status - 1]}
            </div>
          </div>
          <div className="request-detail-content-row2">Request Detail</div>
          <div className="request-detail-content-row3">
            Create date: {new Date(myRequest.createDate).toLocaleString()}
          </div>
          <div className="request-detail-content-row4">
            <div className="update-by">
              <label for="update-by-input" className="update-by-label">
                Expected Date
              </label>
              <input
                type="text"
                className="update-by-input"
                value={fishEntry.expectedDate ? fishEntry.expectedDate : ""}
                disabled={true}
              />
            </div>
            <div className="update-date">
              {" "}
              <label for="update-date-input" className="update-date-label">
                Fee($)
              </label>
              <input
                type="datetime"
                className="update-date-input"
                value={myRequest.fee ? myRequest.fee : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row5">
            <div className="create-by">
              <label for="create-by-input" className="create-by-label">
                Auction Method
              </label>
              <input
                type="text"
                className="create-by-input"
                value={
                  fishEntry.auctionMethod
                    ? method[fishEntry.auctionMethod - 1]
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label for="expected-date-input" className="expected-date-label">
                Increment($)
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.increment ? fishEntry.increment : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row6">
            <div className="delivery-cost">
              <label for="delivery-cost-input" className="delivery-cost-label">
                Min Price($)
              </label>
              <input
                type="number"
                className="delivery-cost-input"
                value={fishEntry.minPrice ? fishEntry.minPrice : 0}
                disabled={true}
              />
            </div>
            <div className="fee">
              {" "}
              <label for="fee-input" className="fee-label">
                Max Price($)
              </label>
              <input
                type="number"
                className="fee-input"
                value={fishEntry.maxPrice ? fishEntry.maxPrice : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row7">
            <label for="note-input" className="note-label">
              Note
            </label>
            <input
              type="text"
              className="note-input"
              value={myRequest.note ? myRequest.note : ""}
              disabled={true}
            />
          </div>

          {myRequest.status === 3 && (
            <div className="request-detail-content-row16">
              <label for="note-input" className="note-label">
                Payment Date
              </label>
              <input
                type="text"
                className="note-input"
                value={myRequest.paymentDate ? myRequest.paymentDate : ""}
                disabled={true}
              />
            </div>
          )}

          <div className="request-detail-content-row5">
            <div className="create-by">
              <label for="create-by-input" className="create-by-label">
                Auction ID
              </label>
              <input
                type="text"
                className="create-by-input"
                value={fishEntry.auctionId ? fishEntry.auctionId : ""}
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label for="expected-date-input" className="expected-date-label">
                Fish ID
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.fishId ? fishEntry.fishId : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row5">
            <div className="create-by">
              <label for="create-by-input" className="create-by-label">
                Start Date
              </label>
              <input
                type="text"
                className="create-by-input"
                value={
                  fishEntry.startDate ? fishEntry.startDate : "Not started yet"
                }
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label for="expected-date-input" className="expected-date-label">
                End Date
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.endDate ? fishEntry.endDate : "Not ended yet"}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row17">
            <div className="create-by">
              <label for="create-by-input" className="create-by-label">
                Highest Bidder
              </label>
              <input
                type="text"
                className="create-by-input"
                value={
                  fishEntry.highestBidder
                    ? bidder.firstName + " " + bidder.lastName
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label for="expected-date-input" className="expected-date-label">
                Highest Price
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.highestPrice ? fishEntry.highestPrice : ""}
                disabled={true}
              />
            </div>
          </div>
          {myRequest.status === 2 && (
            <div className="request-detail-content-row18">
              <button
                className="send-payment-request-btn"
                onClick={handlePayFee}
              >
                Pay Request Fee
              </button>
            </div>
          )}
          {myRequest.status === 1 && (
            <div className="request-detail-content-row18">
              <button
                className="send-cancel-request-btn"
                onClick={handleCancel}
              >
                Cancel Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

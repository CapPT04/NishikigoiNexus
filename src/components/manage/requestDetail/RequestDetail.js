import React, { useEffect, useState } from "react";
import "./RequestDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { useSearchParams } from "react-router-dom";
import {
  handleFishByFishEntryId,
  handleFishEntryByRequestId,
  handleGetRequestDetail,
  handleAcceptRequest,
  handleCancelRequest,
} from "../../../axios/UserService";

const RequestDetail = () => {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("RequestId");
  const [requestDetail, setRequestDetail] = useState("");
  const [fishEntry, setFishEntry] = useState("");
  const [fish, setFish] = useState("");
  const [denyReason, setDenyReason] = useState("");
  const [deniable, setDeniable] = useState(false);

  const [deliveryCost, setDeliveryCost] = useState(0);

  const statusName = ["Processing", "Paying", "Approved", "Denied"];
  const method = ["FixedPriceSale", "SecretBid", "PublicBid", "DutchAuction"];

  const getDetail = async () => {
    const resReq = await handleGetRequestDetail(requestId);

    setRequestDetail(resReq.data);
    const resFishEntry = await handleFishEntryByRequestId(
      resReq.data.requestId
    );
    setFishEntry(resFishEntry.data);

    const resFish = await handleFishByFishEntryId(
      resFishEntry.data.fishEntryId
    );
    setFish(resFish.data);

    console.log(resReq.data);
    console.log(resFishEntry.data);
    console.log(resFish.data);
  };
  const acceptRequest = async () => {
    const token = sessionStorage.getItem("token");
    const res = await handleAcceptRequest(token, requestId, deliveryCost);
    if (res.status === 200) {
      window.location.reload();
    }
  };
  const cancelRequest = async () => {
    const token = sessionStorage.getItem("token");
    const res = await handleCancelRequest(token, requestId, denyReason);
    if (res.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  useEffect(() => {
    if (requestDetail.status === 1) {
      if (denyReason.length > 0) {
        setDeniable(true);
      } else {
        setDeniable(false);
      }
    }
  }, [denyReason, requestDetail.status]);
  return (
    <div className="request-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="request-detail-content">
            <div className="request-detail-content-row1">
              <div className="status">
                Status: {statusName[requestDetail.status - 1]}
              </div>
            </div>
            <div className="request-detail-content-row2">Request Detail</div>
            <div className="request-detail-content-row3">
              Create date: {new Date(requestDetail.createDate).toLocaleString()}
            </div>
            <div className="request-detail-content-row4">
              <div className="update-by">
                <label for="update-by-input" className="update-by-label">
                  Update By
                </label>
                <input type="text" className="update-by-input" value="Thinh" />
              </div>
              <div className="update-date">
                {" "}
                <label for="update-date-input" className="update-date-label">
                  Update Date
                </label>
                <input
                  type="datetime"
                  className="update-date-input"
                  value="YYYY/MM/DD hh:mm:ss"
                />
              </div>
            </div>
            <div className="request-detail-content-row5">
              <div className="create-by">
                <label for="create-by-input" className="create-by-label">
                  Create By
                </label>
                <input
                  type="text"
                  className="create-by-input"
                  value={requestDetail.createBy}
                  disabled={true}
                />
              </div>
              <div className="expected-date">
                {" "}
                <label
                  for="expected-date-input"
                  className="expected-date-label"
                >
                  Expected Date
                </label>
                <input
                  type="datetime"
                  className="expected-date-input"
                  value={new Date(fishEntry.expectedDate).toLocaleString()}
                />
              </div>
            </div>
            <div className="request-detail-content-row6">
              <div className="delivery-cost">
                <label
                  for="delivery-cost-input"
                  className="delivery-cost-label"
                >
                  Delivery Cost
                </label>
                <input
                  type="number"
                  className="delivery-cost-input"
                  onChange={(e) => setDeliveryCost(e.target.value)}
                />
              </div>
              <div className="fee">
                {" "}
                <label for="fee-input" className="fee-label">
                  Fee
                </label>
                <input
                  type="number"
                  className="fee-input"
                  value={requestDetail.fee}
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
                value={requestDetail.note}
              />
            </div>
            <div className="request-detail-content-row8">
              <button
                className="send-payment-request-btn"
                onClick={acceptRequest}
                style={{ display: requestDetail.status === 1 ? "" : "none" }}
              >
                Send Payment Request
              </button>
            </div>
            <div className="request-detail-content-row9">
              <div className="fish-entry-information">
                Fish Entry Information
              </div>
            </div>

            <div className="request-detail-content-row10">
              <div className="fish-id">
                <label for="fish-id-input" className="fish-id-label">
                  Fish Entry ID
                </label>
                <input
                  type="text"
                  className="fish-id-input"
                  value={fishEntry.fishEntryId}
                  disabled={true}
                />
              </div>
              <div className="auction-id">
                {" "}
                <label for="auction-id-input" className="auction-id-label">
                  Auction ID
                </label>
                <input
                  type="text"
                  className="auction-id-input"
                  value={
                    fishEntry.auctionId
                      ? fishEntry.auctionId
                      : "Not yet added any auction"
                  }
                  disabled={true}
                />
              </div>
            </div>

            <div className="request-detail-content-row11">
              <div className="auction-method">
                <label
                  for="auction-method-input"
                  className="auction-method-label"
                >
                  Auction Method
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={method[fishEntry.auctionMethod - 1]}
                  disabled={true}
                />
              </div>
              <div className="auction-method">
                {" "}
                <label for="increment-input" className="auction-method-label">
                  Increment
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={fishEntry.increment}
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-content-row11">
              <div className="auction-method">
                <label
                  for="auction-method-input"
                  className="auction-method-label"
                >
                  Min Price
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={fishEntry.minPrice}
                  disabled={true}
                />
              </div>
              <div className="auction-method">
                {" "}
                <label for="increment-input" className="auction-method-label">
                  Max Price
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={fishEntry.maxPrice}
                  disabled={true}
                />
              </div>
            </div>

            <div className="request-detail-content-row11">
              <div className="auction-method">
                <label
                  for="auction-method-input"
                  className="auction-method-label"
                >
                  Start Date
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={new Date(fishEntry.startDate).toLocaleString()}
                />
              </div>
              <div className="auction-method">
                {" "}
                <label for="increment-input" className="auction-method-label">
                  Increment
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={
                    fishEntry.endDate
                      ? new Date(fishEntry.endDate).toLocaleString()
                      : "Not ended"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-content-row11">
              <div className="auction-method">
                <label
                  for="auction-method-input"
                  className="auction-method-label"
                >
                  Highest Bidder
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={
                    fishEntry.highestBidder ? fishEntry.highestBidder : "No one"
                  }
                  disabled={true}
                />
              </div>
              <div className="auction-method">
                {" "}
                <label for="increment-input" className="auction-method-label">
                  Highest Price
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={fishEntry.highestPrice ? fishEntry.highestPrice : 0}
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-content-row15">
              <div
                className="deny"
                style={{ display: requestDetail.status === 1 ? "" : "none" }}
              >
                Deny
              </div>
            </div>
            <div
              className="request-detail-content-row16"
              style={{ display: requestDetail.status === 1 ? "" : "none" }}
            >
              <label for="reason-input" className="reason-label">
                Reason
              </label>
              <input
                type="text"
                className="reason-input"
                value={
                  requestDetail.status === 4 ? requestDetail.reason : denyReason
                }
                onChange={(e) => {
                  if (requestDetail.status === 1) {
                    setDenyReason(e.target.value);
                  }
                }}
                disabled={requestDetail.status !== 1}
              />
            </div>
            <div
              className="request-detail-content-row17"
              style={{ display: requestDetail.status === 1 ? "" : "none" }}
            >
              <button
                className={`${deniable ? "deny-btn" : "turn-off"}`}
                onClick={cancelRequest}
              >
                Deny
              </button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

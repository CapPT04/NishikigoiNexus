import React, { useEffect, useState } from "react";
import "./RequestDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleFishByFishEntryId,
  handleFishEntryByRequestId,
  handleGetRequestDetail,
  handleAcceptRequest,
  handleCancelRequest,
  handleUserById,
} from "../../../axios/UserService";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const RequestDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = searchParams.get("RequestId");
  const [requestDetail, setRequestDetail] = useState("");
  const [fishEntry, setFishEntry] = useState("");
  const [fish, setFish] = useState("");
  const [denyReason, setDenyReason] = useState("");
  const [deniable, setDeniable] = useState(false);
  const [staff, setStaff] = useState("");

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

  const statusName = ["Processing", "Paying", "Approved", "Denied"];
  const method = ["FixedPriceSale", "SecretBid", "PublicBid", "DutchAuction"];

  const getDetail = async () => {
    const resReq = await handleGetRequestDetail(requestId);
    setRequestDetail(resReq.data);
    // console.log(resReq.data);
    const resFishEntry = await handleFishEntryByRequestId(
      resReq.data.requestId
    );
    setFishEntry(resFishEntry.data);
    const resFish = await handleFishByFishEntryId(
      resFishEntry.data.fishEntryId
    );
    setFish(resFish.data);
    if (resReq.data.updateBy) {
      const resStaff = await handleUserById(resReq.data.updateBy);
      setStaff(resStaff.data);
    }
  };
  const acceptRequest = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept request!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = Cookies.get("token");
        const res = await handleAcceptRequest(token, requestId);
        if (res.status === 200) {
          toast.success("Accept Request Sucessfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.data, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // window.location.reload();
        }
      }
    });
  };
  const cancelRequest = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deny it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = Cookies.get("token");
        const res = await handleCancelRequest(token, requestId, denyReason);
        if (res.status === 200) {
          toast.success("Cancel Request Sucessfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.reload();
        } else {
          toast.error(res.data, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // window.location.reload();
        }
      }
    });
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
        <ToastContainer />
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="request-detail-content">
            <div className="request-detail-staff-content-row1">
              <div className="status">
                Status: {statusName[requestDetail.status - 1]}
              </div>
            </div>
            <div className="request-detail-staff-content-row2">
              Request Detail
            </div>
            <div className="request-detail-staff-content-row3">
              Create date: {new Date(requestDetail.createDate).toLocaleString()}
            </div>
            <div className="request-detail-staff-content-row10">
              <div className="update-by">
                <label for="update-by-input" className="update-by-label">
                  Update By
                </label>
                <input
                  type="text"
                  className="update-by-input"
                  value={staff ? staff.firstName + " " + staff.lastName : ""}
                  disabled={true}
                />
              </div>
              <div className="update-date">
                {" "}
                <label for="update-date-input" className="update-date-label">
                  Update Date
                </label>
                <input
                  type="datetime"
                  className="update-date-input"
                  value={
                    requestDetail.updateDate
                      ? new Date(requestDetail.updateDate).toLocaleString()
                      : "Not Updated Yet"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-staff-content-row10">
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
            <div className="request-detail-staff-content-row10">
              <div className="delivery-cost">
                <label
                  for="delivery-cost-input"
                  className="delivery-cost-label"
                >
                  Note
                </label>
                <input
                  type="text"
                  className="delivery-cost-input"
                  value={requestDetail.note}
                  disabled={true}
                />
              </div>
              <div className="fee">
                {" "}
                <label for="fee-input" className="fee-label">
                  Fee
                </label>
                <input
                  type="text"
                  className="fee-input"
                  value={
                    requestDetail.fee
                      ? formatMoney(requestDetail.fee) + " VND"
                      : "0 VND"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-staff-content-row8">
              <button
                className="send-payment-request-btn"
                onClick={acceptRequest}
                style={{ display: requestDetail.status === 1 ? "" : "none" }}
              >
                Send Payment Request
              </button>
            </div>
            <div className="request-detail-staff-content-row9">
              <div className="fish-entry-information">
                Fish Entry #{fishEntry.fishEntryId} Information
              </div>
            </div>

            <div className="request-detail-staff-content-row10">
              <div
                className="fish-id"
                onClick={() =>
                  navigate("/Manager/KoiDetail", {
                    state: { koi: fishEntry },
                  })
                }
              >
                <label for="fish-id-input" className="fish-id-label">
                  Fish ID
                </label>
                <input
                  type="text"
                  className="fish-id-input"
                  value={fishEntry.fishId}
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

            <div className="request-detail-staff-content-row11">
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
                  value={
                    fishEntry.increment
                      ? formatMoney(fishEntry.increment) + " VND"
                      : "0"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-staff-content-row11">
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
                  value={
                    fishEntry.minPrice
                      ? formatMoney(fishEntry.minPrice) + " VND"
                      : "0 VND"
                  }
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
                  value={
                    fishEntry.maxPrice
                      ? formatMoney(fishEntry.maxPrice) + " VND"
                      : "0 VND"
                  }
                  disabled={true}
                />
              </div>
            </div>

            <div className="request-detail-staff-content-row11">
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
                  value={
                    fishEntry.startDate
                      ? new Date(fishEntry.startDate).toLocaleString()
                      : "Not Start Yet"
                  }
                />
              </div>
              <div className="auction-method">
                {" "}
                <label for="increment-input" className="auction-method-label">
                  End Date
                </label>
                <input
                  type="text"
                  className="auction-method-input"
                  value={
                    fishEntry.endDate
                      ? new Date(fishEntry.endDate).toLocaleString()
                      : "Not Ended"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-staff-content-row11">
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
                  value={fishEntry.highestBidder ? fishEntry.highestBidder : ""}
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
                  value={
                    fishEntry.highestPrice
                      ? formatMoney(fishEntry.highestPrice) + " VND"
                      : ""
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="request-detail-staff-content-row15">
              <div
                className="deny"
                style={{ display: requestDetail.status === 1 ? "" : "none" }}
              >
                Deny
              </div>
            </div>
            <div
              className="request-detail-staff-content-row16"
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
              className="request-detail-staff-content-row17"
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

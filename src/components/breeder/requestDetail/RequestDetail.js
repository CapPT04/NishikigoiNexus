import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import "./RequestDetail.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleCancelRequest,
  handleFeeWalletPaymentApi,
  handleFishEntryByRequestId,
  handleGetFishEntry,
  handleGetRequestDetail,
  handlePayFeeAPI,
  handleUserById,
  handleWalletPaymentApi,
} from "../../../axios/UserService";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import Swal from "sweetalert2";

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
  //-------get info----------
  const getInfoRequestDetail = async () => {
    try {
      //   console.log("before save");
      const resRequest = await handleGetRequestDetail(reqID);
      const resFish = await handleFishEntryByRequestId(reqID);
      // console.log(resFish.data.highestBidder);
      if (resFish.data.highestBidder) {
        const user = await handleUserById(resFish.data.highestBidder);
        setBidder(user.data);
      }
      setMyRequest(resRequest.data);
      setFishEntry(resFish.data);
    } catch (error) {
      console.error("Error fetching request detail:", error);
    }
  };
  //------ pay fee----------
  const handlePayFee = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay the fee!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleFeeWalletPaymentApi(token, reqID);
        console.log(res);
        if (res.status === 200) {
          toast.success("Pay Fee Sucessfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // window.location.reload();
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
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };
  //-----cancel----
  const handleCancel = async () => {
    // console.log("cancel");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleCancelRequest(token, reqID);
        if (response.status === 200) {
          toast.success("Cancel Request Sucessfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // window.location.reload();
        } else {
          toast.error(response.data, {
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
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
        <ToastContainer />
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
                value={
                  fishEntry.expectedDate
                    ? new Date(fishEntry.expectedDate).toLocaleString()
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="update-date">
              {" "}
              <label for="update-date-input" className="update-date-label">
                Fee
              </label>
              <input
                type="datetime"
                className="update-date-input"
                value={myRequest.fee ? formatMoney(myRequest.fee) + " VND" : 0}
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
                Increment
              </label>
              <input
                type="text"
                className="expected-date-input"
                value={
                  fishEntry.increment
                    ? formatMoney(fishEntry.increment) + " VND"
                    : "0 VND"
                }
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row6">
            <div className="delivery-cost">
              <label for="delivery-cost-input" className="delivery-cost-label">
                Min Price
              </label>
              <input
                type="text"
                className="delivery-cost-input"
                value={
                  fishEntry.minPrice
                    ? formatMoney(fishEntry.minPrice) + " VND"
                    : "0 VND"
                }
                disabled={true}
              />
            </div>
            <div className="fee">
              {" "}
              <label for="fee-input" className="fee-label">
                Max Price
              </label>
              <input
                type="text"
                className="fee-input"
                value={
                  fishEntry.maxPrice
                    ? formatMoney(fishEntry.maxPrice) + " VND"
                    : "0 VND"
                }
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
                value={
                  myRequest.paymentDate
                    ? new Date(myRequest.paymentDate).toLocaleString()
                    : ""
                }
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
                value={
                  fishEntry.highestPrice
                    ? formatMoney(fishEntry.highestPrice) + " VND"
                    : ""
                }
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
          {(myRequest.status === 3 || myRequest.status === 4) && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

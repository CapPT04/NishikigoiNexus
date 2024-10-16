import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import "./RequestDetail.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleGetFishEntry,
  handleGetRequestDetail,
  handlePayFeeAPI,
} from "../../../axios/UserService";

const RequestDetail = () => {
  const navigate = useNavigate();
  const [myRequest, setMyRequest] = useState({});
  const [fishEntry, setFishEntry] = useState("");
  const [searchParams] = useSearchParams();
  const reqID = searchParams.get("id");
  const token = sessionStorage.getItem("token");

  //-------get info----------
  const getRequestDetail = async () => {
    try {
      //   console.log("before save");
      const resRequest = await handleGetRequestDetail(reqID);
      const resFish = await handleGetFishEntry(reqID);
      setMyRequest(resRequest.data);
      setFishEntry(resFish.data);
    } catch (error) {
      console.error("Error fetching request detail:", error);
    }
  };
  //------ pay fee----------
  const handlePayFee = async () => {
    // implement your payment logic here
    console.log("pay");
    console.log(token);
    const link = await handlePayFeeAPI(token, reqID);
    // console.log(link);
    window.location.href = link.data;
  };

  useEffect(() => {
    getRequestDetail();
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
            <div className="status">Status: {myRequest.status}</div>
          </div>
          <div className="request-detail-content-row2">Request Detail</div>
          <div className="request-detail-content-row3">
            Create date: {myRequest.createDate}
          </div>
          <div className="request-detail-content-row4">
            <div className="update-by">
              <label for="update-by-input" className="update-by-label">
                Update By
              </label>
              <input
                type="text"
                className="update-by-input"
                value={myRequest.updateBy ? myRequest.updateBy : ""}
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
                value={myRequest.updateDate ? myRequest.updateBy : ""}
                disabled={true}
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
                value={myRequest.createBy ? myRequest.createBy : ""}
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label for="expected-date-input" className="expected-date-label">
                Expected Date
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.expectedDate ? fishEntry.expectedDate : ""}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row6">
            <div className="delivery-cost">
              <label for="delivery-cost-input" className="delivery-cost-label">
                Delivery Cost
              </label>
              <input
                type="number"
                className="delivery-cost-input"
                value="1234"
              />
            </div>
            <div className="fee">
              {" "}
              <label for="fee-input" className="fee-label">
                Fee
              </label>
              <input type="number" className="fee-input" value="1534" />
            </div>
          </div>
          <div className="request-detail-content-row7">
            <label for="note-input" className="note-label">
              Note
            </label>
            <input type="text" className="note-input" value="Note zo day" />
          </div>
          <div className="request-detail-content-row8">
            <button className="send-payment-request-btn" onClick={handlePayFee}>
              Send Payment Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

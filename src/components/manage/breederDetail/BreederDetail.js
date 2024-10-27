import React, { useEffect, useState } from "react";
import "./BreederDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleGetAllRequest,
  handleToggleBreederStatus,
  handleToggleUserStatus,
  handleUpdateBreederCommission,
  handleUserById,
} from "../../../axios/UserService";

const BreederDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [breeder, setBreeder] = useState("");
  const [staffCreated, setStaffCreated] = useState("");
  const [commission, setCommission] = useState(0);
  const [reasonBan, setReasonBan] = useState("");
  const [bannable, setBannable] = useState(false);
  const [unbannable, setUnbannable] = useState(false);
  const [requests, setRequests] = useState([]);

  const statusRequest = ["Processing", "Paying", "Approved", "Denied"];
  const statusName = ["Active", "Inactive"];

  const getAllInfo = async () => {
    try {
      //get info of breeder
      const breId = searchParams.get("id");
      const resBre = await handleUserById(breId);
      setBreeder(resBre.data);
      //get info of staff created
      const resStaff = await handleUserById(resBre.data.createBy);
      setStaffCreated(resStaff.data);
      //get all request
      const resReq = await handleGetAllRequest();
      for (let i = 0; i < resReq.data.$values.length; i++) {
        if (resReq.data.$values[i].createBy === parseInt(resBre.data.userId)) {
          setRequests((prev) => [...prev, resReq.data.$values[i]]);
        }
      }
    } catch (error) {
      throw error;
    }
  };
  const handleBan = async () => {
    const token = sessionStorage.getItem("token");
    const res = await handleToggleUserStatus(token, breeder.userId, reasonBan);
    console.log(res);
    if (res.status === 200) {
      // console.log("Banned");
      window.location.reload();
    }
  };
  const handleUnBan = async () => {
    const token = sessionStorage.getItem("token");
    const res = await handleToggleUserStatus(token, breeder.userId, null);
    // console.log(res);
    if (res.status === 200) {
      // console.log("UnBanned");
      window.location.reload();
    }
  };

  const handleUpdateCommission = async () => {
    const token = sessionStorage.getItem("token");
    const res = await handleUpdateBreederCommission(
      token,
      breeder.userId,
      commission
    );
    if (res.status === 200) {
      // console.log("UnBanned");
      window.location.reload();
    }
  };
  useEffect(() => {
    getAllInfo();
  }, []);
  useEffect(() => {
    if (reasonBan.length > 0) {
      setBannable(true);
    } else {
      setBannable(false);
    }
  }, [reasonBan, bannable]);
  useEffect(() => {
    if (breeder.status === 2) {
      setUnbannable(true);
      // console.log("can unban");
    } else {
      setUnbannable(false);
    }
  }, [unbannable, breeder.status]);

  return (
    <div className="breeder-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="breeder-detail-content">
            <div className="breeder-detail-content-row1">
              <div className="status">
                Status: {statusName[breeder.status - 1]}
              </div>
              {/* <select name="" id="" className="set-status">
                <option value="">Set status &nbsp;&nbsp; v</option>
              </select> */}
            </div>
            <div className="breeder-detail-content-row2">
              Breeder Infomation
            </div>
            <div className="breeder-detail-content-row3">
              Join date: {new Date(breeder.createDate).toLocaleString()}
            </div>
            <div className="breeder-detail-content-row4">
              <div className="create-by">
                <label htmlFor="create-by-input" className="create-by-label">
                  Create By
                </label>
                <input
                  type="text"
                  className="create-by-input"
                  //lỗi ở đây
                  value={
                    staffCreated
                      ? staffCreated.firstName + " " + staffCreated.lastName
                      : ""
                  }
                  disabled={true}
                />
              </div>
              <div className="last-update">
                {" "}
                <label
                  htmlFor="last-update-input"
                  className="last-update-label"
                >
                  Last Update
                </label>
                <input
                  type="datetime"
                  className="last-update-input"
                  value={
                    breeder.updateDate
                      ? new Date(breeder.updateDate).toLocaleString()
                      : "Not updated yet"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="breeder-detail-content-row5">
              <div className="email">
                <label htmlFor="email-input" className="email-label">
                  Email
                </label>
                <input
                  type="text"
                  className="email-input"
                  value={breeder.email}
                  disabled={true}
                />
              </div>
              <div className="phone">
                {" "}
                <label htmlFor="phone-input" className="phone-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="phone-input"
                  value={breeder.phone}
                  disabled={true}
                />
              </div>
            </div>
            <div className="breeder-detail-content-row6">
              <div className="first-name">
                <label htmlFor="first-name-input" className="first-name-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="first-name-input"
                  value={breeder.firstName}
                  disabled={true}
                />
              </div>
              <div className="last-name">
                {" "}
                <label htmlFor="last-name-input" className="last-name-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="last-name-input"
                  value={breeder.lastName}
                  disabled={true}
                />
              </div>
            </div>
            <div className="breeder-detail-content-row7">
              <div className="city">
                <label htmlFor="city-input" className="city-label">
                  City
                </label>
                <input
                  type="text"
                  className="city-input"
                  value={breeder.city}
                  disabled={true}
                />
              </div>
              <div className="commission">
                <label htmlFor="commission-input" className="commission-label">
                  Commission
                </label>
                <input
                  type="text"
                  className="commission-input"
                  placeholder={`${breeder.commission} %`}
                  onChange={(e) => setCommission(e.target.value)}
                  // disabled={true}
                />
              </div>
            </div>
            <div className="breeder-detail-content-row8">
              <label htmlFor="address-input" className="address-label">
                Address
              </label>
              <input
                type="text"
                className="address-input"
                value={breeder.address}
                disabled={true}
              />
            </div>
            {/* chua lam update commission */}
            <div className="breeder-detail-content-row11">
              <button className="update-btn" onClick={handleUpdateCommission}>
                Update
              </button>
              <button
                className="cancel-btn"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
            <div className="breeder-detail-content-row9">
              <div className="ban-unban">Ban / Unban</div>
            </div>
            <div className="breeder-detail-content-row10">
              <label htmlFor="reason-input" className="reason-label">
                Reason
              </label>
              <input
                type="text"
                className="reason-input"
                // value={breeder.reason}
                placeholder={breeder.reason}
                onChange={(e) => {
                  setReasonBan(e.target.value);
                }}
                disabled={breeder.status === 2 ? true : false}
              />
            </div>
            <div className="breeder-detail-content-row12">
              <button
                className={`ban-btn ${bannable ? "" : "bannable"}`}
                disabled={!bannable}
                onClick={handleBan}
              >
                Ban
              </button>
              <button
                className="unban-btn"
                disabled={!unbannable}
                onClick={handleUnBan}
              >
                Unban
              </button>
            </div>
            <div className="breeder-detail-content-row13">
              <div className="request-history">Request history</div>
            </div>
            <div className="breeder-detail-content-row14">
              <table className="table-request-history">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Create Date</th>
                    <th>Fish ID</th>
                    <th>Request Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {requests &&
                    requests.map((req, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{new Date(req.createDate).toLocaleString()}</td>
                          <td>{req.fishId}</td>
                          <td>{statusRequest[req.status - 1]}</td>
                          <td>
                            <button
                              className="details-btn"
                              onClick={() =>
                                navigate(
                                  `/Manager/RequestDetail?RequestId=${req.requestId}`
                                )
                              }
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreederDetail;

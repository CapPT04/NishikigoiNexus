import React, { useEffect, useState } from "react";
import "./UserDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { useSearchParams } from "react-router-dom";
import {
  handleToggleUserStatus,
  handleUserBidHistory,
  handleUserById,
} from "../../../axios/UserService";

const UserDetail = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState("");
  const [staff, setStaff] = useState("");
  const [bidHistory, setBidHistory] = useState([]);
  const [reasonBan, setReasonBan] = useState(
    user.status === 2 ? user.reason : ""
  );
  const [bannable, setBannable] = useState(false);
  const [unbannable, setUnbannable] = useState(false);

  const statusName = ["Active", "Inactive"];
  const methodName = [
    "",
    "FixedPriceSale",
    "SecretBid",
    "PublicBid",
    "DutchAuction",
  ];

  const getInfo = async () => {
    const resUser = await handleUserById(userId);
    setUser(resUser.data);
    const resStaff = await handleUserById(resUser.data.updateBy);
    setStaff(resStaff.data);
    const resHistory = await handleUserBidHistory(userId);
    setBidHistory(resHistory.data.$values);
  };

  const handleBan = async () => {
    const token = sessionStorage.getItem("token");
    console.log("ban");
    const res = await handleToggleUserStatus(token, user.userId, reasonBan);
    if (res.status === 200) {
      // console.log("Banned");
      window.location.reload();
    }
  };
  const handleUnBan = async () => {
    const token = sessionStorage.getItem("token");
    console.log("Unban");
    const res = await handleToggleUserStatus(token, user.userId, null);
    // console.log(res);
    if (res.status === 200) {
      window.location.reload();
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    if (reasonBan.length > 0) {
      setBannable(true);
    } else {
      setBannable(false);
    }
  }, [reasonBan, bannable]);
  useEffect(() => {
    if (user.status === 2) {
      setUnbannable(true);
      // console.log("can unban");
    } else {
      setUnbannable(false);
    }
  }, [unbannable, user.status]);

  return (
    <div className="member-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="member-detail-content">
            <div className="member-detail-content-row1">
              <div className="status">
                Status: {statusName[user.status - 1]}
              </div>
              {/* <select name="" id="" className="set-status">
            <option value="">Set status &nbsp;&nbsp; v</option>
          </select> */}
            </div>
            <div className="member-detail-content-row2">
              Member #{user.userId} Detail
            </div>
            <div className="member-detail-content-row3">
              Create date: {new Date(user.createDate).toLocaleString()}
            </div>
            <div className="member-detail-content-row4">
              <div className="email">
                <label htmlFor="email-input" className="email-label">
                  Update By
                </label>
                <input
                  type="text"
                  className="email-input"
                  value={staff.firstName + " " + staff.lastName}
                  disabled={true}
                />
              </div>
              <div className="gender">
                {" "}
                <label htmlFor="gender-input" className="gender-label">
                  Last Update Date
                </label>
                <input
                  type="text"
                  className="gender-input"
                  value={new Date(user.updateDate).toLocaleString()}
                  disabled={true}
                />
              </div>
            </div>
            <div className="member-detail-content-row4">
              <div className="email">
                <label htmlFor="email-input" className="email-label">
                  Email
                </label>
                <input
                  type="text"
                  className="email-input"
                  value={user.email}
                  disabled={true}
                />
              </div>
              <div className="gender">
                {" "}
                <label htmlFor="gender-input" className="gender-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="gender-input"
                  value={
                    user.gender
                      ? user.gender === 1
                        ? "Male"
                        : "Female"
                      : "Unknown"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="member-detail-content-row5">
              <div className="first-name">
                <label htmlFor="first-name-input" className="first-name-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="first-name-input"
                  value={user.firstName}
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
                  value={user.lastName}
                  disabled={true}
                />
              </div>
            </div>
            <div className="member-detail-content-row6">
              <div className="phone">
                {" "}
                <label htmlFor="phone-input" className="phone-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="phone-input"
                  value={user.phone}
                  disabled={true}
                />
              </div>
              <div className="city">
                <label htmlFor="city-input" className="city-label">
                  City
                </label>
                <input
                  type="text"
                  className="city-input"
                  value={user.city ? user.city : "Unknown"}
                  disabled={true}
                />
              </div>
            </div>
            <div className="member-detail-content-row7">
              <label htmlFor="address-input" className="address-label">
                Address
              </label>
              <input
                type="text"
                className="address-input"
                value={user.address ? user.address : "Unknown"}
                disabled={true}
              />
            </div>
            <div className="member-detail-content-row8">
              <div className="ban-unban">Ban / Unban</div>
            </div>
            <div className="member-detail-content-row9">
              <label htmlFor="reason-input" className="reason-label">
                Reason
              </label>
              <input
                type="text"
                className="reason-input"
                value={user.status === 2 ? user.reason : reasonBan}
                onChange={(e) => {
                  if (user.status !== 2) {
                    setReasonBan(e.target.value);
                  }
                }}
                disabled={user.status === 2 ? true : false}
              />
            </div>
            <div className="member-detail-content-row10">
              <button
                className={`ban-btn ${bannable ? "bannable" : ""}`}
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

            <div className="member-detail-content-row11">
              <div className="bidding-history">Bidding History</div>
            </div>
            <div className="member-detail-content-row12">
              <table className="table-request-history">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Fish Entry Id</th>
                    <th>Bidding date</th>
                    <th>Auction Method</th>
                    <th>Is winner</th>
                  </tr>
                </thead>
                <tbody>
                  {bidHistory && bidHistory.length > 0 ? (
                    bidHistory.map((bid, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{bid.fishEntryId}</td>
                          <td>{new Date(bid.startDate).toLocaleString()}</td>
                          <td>{methodName[bid.auctionMethod]}</td>
                          <td>{bid.isWinner ? "Winner" : "No Win"}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No Bided History</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

import React, { useEffect, useState } from "react";
import "../history/History.scss";
import Navbar from "../../common/Navbar/Navbar";
import { handleGetAllRequest } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const History = () => {
  const [requests, setRequests] = useState([]);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const navigate = useNavigate();

  const statusName = ["Processing", "Paying", "Approved", "Denied"];

  const getRequests = async () => {
    const res = await handleGetAllRequest();
    // console.log(user.UserID);
    // console.log(res.data.$values);
    // setRequests(res.data.$values);
    for (let i = 0; i < res.data.$values.length; i++) {
      if (user) {
        if (res.data.$values[i].createBy === parseInt(user.UserID, 10)) {
          // console.log(i);
          setRequests((prev) => [...prev, res.data.$values[i]]);
        }
      }
      // console.log(res.data.$values[i]);
      // console.log(typeof user.UserID);
      // setRequests((prev) => [...prev, res.data.$values[i]]);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  // useEffect(() => {
  //   console.log("reuslt:", requests);
  // });
  return (
    <div>
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div className="navigation-bar-vertically-history">
          {/* loi o day */}
          <a
            className="request"
            onClick={() => navigate("/Breeder/HistoryRequest")}
          >
            Request
          </a>
          <a className="koi" onClick={() => navigate("/Breeder/FishList")}>
            KOI
          </a>
          <a
            className="koi"
            onClick={() => navigate("/Breeder/HistoryDelivery")}
          >
            Delivery
          </a>
        </div>
        <div className="right-content">
          {/* <div className="search">
            <div className="search-text">Search:</div>
            <div className="search-value">
              <input
                className="search-input"
                placeholder="Search by Email and Phone number"
                type="text"
              />
              <div className="search-icon">
                <img src="../assets/images/search.svg" alt="" />
              </div>
            </div>
          </div> */}
          <table className="table-manage-request">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Fish ID</th>
                <th>Create Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests &&
                requests.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>{" "}
                      {/* Replace static "1" with index + 1 */}
                      <td>{item.requestId}</td>{" "}
                      {/* Assuming the item has an 'id' field */}
                      <td>{item.fishId}</td>{" "}
                      {/* Assuming the item has a 'fishId' field */}
                      <td>{new Date(item.createDate).toLocaleString()}</td>{" "}
                      {/* Assuming the item has a 'createDate' field */}
                      <td>{statusName[item.status - 1]}</td>{" "}
                      {/* Assuming the item has a 'status' field */}
                      <td>
                        <a
                          onClick={() =>
                            navigate(
                              `/Breeder/DetailRequest?id=${item.requestId}`
                            )
                          }
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

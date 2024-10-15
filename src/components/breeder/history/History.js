import React, { useEffect, useState } from "react";
import "./History.scss";
import Navbar from "../../common/Navbar/Navbar";
import { handleGetAllRequest } from "../../../axios/UserService";

const History = () => {
  const [requests, setRequests] = useState([]);
  const getRequests = async () => {
    const res = await handleGetAllRequest();
    for (let i = 0; i < res.$values.length; i++) {
      // requests.map((item, index) => {
      //   if (item.$id !== res.$values.$id) {
      //     setRequests((prev) => [...prev, res.$values[i]]);
      //   }
      // });
      setRequests((prev) => [...prev, res.$values[i]]);
    }
  };

  useEffect(() => {
    getRequests();
  }, [requests]);
  return (
    <div>
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div className="search">
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
        </div>
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
                    <td>{item.$id}</td>{" "}
                    {/* Assuming the item has an 'id' field */}
                    <td>{item.fishId}</td>{" "}
                    {/* Assuming the item has a 'fishId' field */}
                    <td>{new Date(item.createDate).toLocaleString()}</td>{" "}
                    {/* Assuming the item has a 'createDate' field */}
                    <td>{item.status}</td>{" "}
                    {/* Assuming the item has a 'status' field */}
                    <td>
                      <a href="#">
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
  );
};

export default History;

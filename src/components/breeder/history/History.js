import React, { useEffect, useState } from "react";
import "./History.scss";
import Navbar from "../../common/Navbar/Navbar";
import { handleGetAllRequest } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const getRequests = async () => {
    const res = await handleGetAllRequest();
    // console.log(res);
    // setRequests(res.data.$values);
    for (let i = 0; i < res.data.$values.length; i++) {
      // res.map((item, index) => {
      //   if (item.$id !== res.data.$values.$id) {
      //     setRequests((prev) => [...prev, res.$values[i]]);
      //   }
      // });
      setRequests((prev) => [...prev, res.data.$values[i]]);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
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
                    <td>{item.requestId}</td>{" "}
                    {/* Assuming the item has an 'id' field */}
                    <td>{item.fishId}</td>{" "}
                    {/* Assuming the item has a 'fishId' field */}
                    <td>{new Date(item.createDate).toLocaleString()}</td>{" "}
                    {/* Assuming the item has a 'createDate' field */}
                    <td>{item.status}</td>{" "}
                    {/* Assuming the item has a 'status' field */}
                    <td>
                      <a
                        onClick={() =>
                          navigate(`/DetailRequest?id=${item.requestId}`)
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
  );
};

export default History;

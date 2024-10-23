import React, { useEffect, useState } from "react";
import "./ManageRequest.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleGetAllRequest } from "../../../axios/UserService";

const ManageRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const statusName = ["Processing", "Paying", "Approved", "Denied"];

  const getAllRequests = async () => {
    const res = await handleGetAllRequest();
    setRequests(res.data.$values);
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <div className="manage-request-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
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
                <th>Breeder ID</th>
                <th>Fish ID</th>
                <th>Create Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{request.requestId}</td>
                      <td>{request.createBy}</td>
                      <td>{request.fishId}</td>
                      <td>{new Date(request.createDate).toLocaleString()}</td>
                      <td>{statusName[request.status - 1]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate(
                              `/Manager/RequestDetail?RequestId=${request.requestId}`
                            )
                          }
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>No Request Exists</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;

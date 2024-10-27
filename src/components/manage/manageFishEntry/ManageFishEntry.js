import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleAllFishEntry } from "../../../axios/UserService";
import { useNavigate } from "react-router";

const ManageFishEntry = () => {
  const navigate = useNavigate();
  const [fishEntries, setFishEntries] = useState([]);
  const statusName = ["Unknown", "Preparing", "Waitting", "Bidding", "Ended"];

  const getFishEntries = async () => {
    const res = await handleAllFishEntry();
    console.log(res.data.$values);
    setFishEntries(res.data.$values);
  };
  useEffect(() => {
    getFishEntries();
  }, []);
  return (
    <div className="manage-koi-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="search">
            <div className="search-text">Search: </div>
            <div className="search-value">
              {" "}
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
          <table className="table-manage-koi">
            <thead>
              <tr>
                <th>No</th>
                <th>Fish Entry ID</th>
                <th>Fish ID</th>
                <th>Request ID</th>
                <th>Expected Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fishEntries.length > 0 ? (
                fishEntries.map((koi, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{koi.fishEntryId}</td>
                      <td>{koi.fishId}</td>
                      <td>{koi.requestId}</td>
                      <td>{new Date(koi.expectedDate).toLocaleString()}</td>
                      <td>{statusName[koi.status]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate("/Manager/FishEntryDetail", {
                              state: koi,
                            })
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
                  <td colSpan="7">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFishEntry;

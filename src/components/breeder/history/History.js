import React from "react";
import "./History.scss";
import Navbar from "../../common/Navbar/Navbar";

const History = () => {
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
              <th>Breeder ID</th>
              <th>Fish ID</th>
              <th>Create Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>Active</td>
              <td>
                <a href="#">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>Active</td>
              <td>
                <a href="#">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>Active</td>
              <td>
                <a href="#">
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;

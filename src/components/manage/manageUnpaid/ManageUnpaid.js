import React from "react";
import "./ManageUnpaid.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";

const ManageUnpaid = () => {
  return (
    <div className="manage-unpaid-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <table className="table-manage-unpaid">
            <thead>
              <tr>
                <th>No</th>
                <th>Delivery ID</th>
                <th>Fish Entry ID</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUnpaid;

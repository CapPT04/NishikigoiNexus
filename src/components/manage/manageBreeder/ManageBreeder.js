import React, { useEffect, useState } from "react";
import "./ManageBreeder.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { handleGetAllBreeders } from "../../../axios/UserService";

const ManageBreeder = () => {
  const [breeders, setBreeders] = useState([]);

  const getAllBreeders = async () => {
    const resBreeder = await handleGetAllBreeders();
    setBreeders(resBreeder.data.$values);
  };

  useEffect(() => {
    getAllBreeders();
  }, []);
  return (
    <div className="manage-breeder-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body-content">
        <VerticallyNavbar />
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
                <img src=". g" alt="" />
              </div>
            </div>
          </div>
          <table className="table-manage-breeder">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>Thinh</td>
                <td>Dinh Le</td>
                <td>thinhdlse181755@fpt.edu.vn</td>
                <td>0362683366</td>
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
    </div>
  );
};

export default ManageBreeder;

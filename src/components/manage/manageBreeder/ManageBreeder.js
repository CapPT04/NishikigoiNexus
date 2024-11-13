import React, { useEffect, useState } from "react";
import "./ManageBreeder.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import searchIcon from "../../../assets/images/search.svg";
import { handleGetAllBreeders } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";

const ManageBreeder = () => {
  const [breeders, setBreeders] = useState([]);
  const navigate = useNavigate();
  const statusName = ["Active", "Inactive"];

  const getAllBreeders = async () => {
    const resBreeder = await handleGetAllBreeders();
    for (let i = 0; i < resBreeder.data.$values.length; i++) {
      setBreeders((prev) => [...prev, resBreeder.data.$values[i]]);
    }
    // setBreeders(resBreeder.data.$values);
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
          <div className="search-and-create">
            {/* <div className="search">
              <div className="search-text">Search: </div>
              <div className="search-value">
                <input
                  className="search-input"
                  placeholder="Search by Email and Phone number"
                  type="text"
                />
                <div className="search-icon">
                  <img src={searchIcon} alt="search-icon" />
                </div>
              </div>
            </div> */}
            <div
              className="create-btn"
              onClick={() => navigate("/Manager/CreateBreeder")}
            >
              New Breeder
              <i className="fa-solid fa-plus"></i>
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
              {/* {console.log(breeders)} */}
              {breeders.length > 0 ? (
                breeders.map((breeder, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{breeder.userId}</td>
                      <td>{breeder.firstName}</td>
                      <td>{breeder.lastName}</td>
                      <td>{breeder.email}</td>
                      <td>{breeder.phone}</td>
                      <td>{statusName[breeder.status - 1]}</td>
                      <td>
                        {/* <a href="#"> */}
                        <i
                          className="fa-solid fa-arrow-right"
                          onClick={() =>
                            navigate(
                              `/Manager/BreederDetail?id=${breeder.userId}`
                            )
                          }
                        ></i>
                        {/* </a> */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8">No breeder available</td>
                </tr>
              )}

              {/* {breeders.length > 0
                ? breeders.map((breeder, index) => {
                    console.log("@", breeder.userId);
                  })
                : console.log("b")} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBreeder;

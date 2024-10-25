import React, { useEffect, useState } from "react";
import "./ManageKoi.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleGetAllFish, handleUserById } from "../../../axios/UserService";
import { useNavigate } from "react-router";

const ManageKoi = () => {
  const [listKois, setListKois] = useState([]);
  // const [nameBreeder, setNameBreeder] = useState("");
  const navigate = useNavigate();

  const getListKois = async () => {
    const res = await handleGetAllFish();
    // console.log(res.data.$values);
    setListKois(res.data.$values);
  };
  // const getNameBreeder = async (breederId) => {
  //   const res = await handleUserById(breederId);
  //   return res.data.firstName + " " + res.data.lastName;
  // };

  useEffect(() => {
    getListKois();
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
                <th>Fish ID</th>
                <th>Fish Name</th>
                <th>Create Date</th>
                <th>Breeder ID</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listKois.length > 0 ? (
                listKois.map((koi, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{koi.fishId}</td>
                      <td>{koi.fishName}</td>
                      <td>{new Date(koi.createDate).toLocaleString()}</td>
                      <td>{koi.createBy}</td>
                      <td>{koi.status === 1 ? "Available" : "Sold"}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate("/Manager/KoiDetail", {
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

export default ManageKoi;

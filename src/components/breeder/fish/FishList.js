import React, { useEffect, useState } from "react";
import "../fish/FishList.scss";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { handleGetAllFish } from "../../../axios/UserService";
import Cookies from "js-cookie";

const FishList = () => {
  const [fishs, setFishs] = useState([]);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const navigate = useNavigate();

  const statusName = ["Available", "Sold"];

  const getAllFish = async () => {
    const res = await handleGetAllFish();
    // console.log(res.data.$values);
    for (let i = 0; i < res.data.$values.length; i++) {
      if (user) {
        if (res.data.$values[i].createBy === parseInt(user.UserID)) {
          // console.log(i);
          setFishs((prev) => [...prev, res.data.$values[i]]);
        }
      }
    }
  };

  useEffect(() => {
    getAllFish();
  }, []);
  return (
    <div>
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div class="navigation-bar-vertically">
          {/* loi o day */}
          <a
            class="request"
            onClick={() => navigate("/Breeder/HistoryRequest")}
          >
            Request
          </a>
          <a class="koi" onClick={() => navigate("/Breeder/FishList")}>
            KOI
          </a>
        </div>
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
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fishs &&
                fishs.map((fish, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{fish.fishId}</td>
                      <td>{fish.fishName}</td>
                      <td>
                        {fish.createDate
                          ? new Date(fish.createDate).toLocaleString()
                          : "Not yet"}
                      </td>
                      <td>{statusName[fish.status - 1]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate(
                              `/Breeder/DetailFish?FishId=${fish.fishId}`
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

export default FishList;

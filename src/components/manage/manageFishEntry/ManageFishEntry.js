import React from "react";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";

const ManageFishEntry = () => {
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
              {/* {listKois.length > 0 ? (
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
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFishEntry;

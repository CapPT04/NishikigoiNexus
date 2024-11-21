import React, { useEffect, useState } from "react";
import "./ManageUnpaid.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleManageUnpaid } from "../../../axios/UserService";

const ManageUnpaid = () => {
  const navigate = useNavigate();
  const [listUnpaid, setListUnpaid] = useState([]);
  const getAllInfo = async () => {
    const res = await handleManageUnpaid();
    console.log(res.data);
    setListUnpaid(res.data.$values);
  };
  useEffect(() => {
    getAllInfo();
  }, []);
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
                <th>Auction ID</th>
                <th>Fish Entry ID</th>
                <th>End Date</th>
                <th>Winner ID</th>
                <th>Winner Profile</th>
              </tr>
            </thead>
            <tbody>
              {listUnpaid?.length > 0 ? (
                listUnpaid.map((unpaid, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{unpaid.auctionId}</td>
                      <td>{unpaid.fishEntryId}</td>
                      <td>
                        {unpaid.endDate
                          ? new Date(unpaid.endDate).toLocaleString()
                          : ""}
                      </td>
                      <td>{unpaid.winnerId}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate(
                              `/Manager/UserDetail?userId=${unpaid.winnerId}`
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
                  <td className="spanCol" colSpan="6">
                    No Unpaid Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUnpaid;

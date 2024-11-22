import { useNavigate } from "react-router";
import Navbar from "../../common/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./DeliveryList.scss";
import Cookies from "js-cookie";
import { handleGetDeliveryByToken } from "../../../axios/UserService";

const DeliveryLsit = () => {
  const navigate = useNavigate();
  const [listDelivery, setListDelivery] = useState([]);
  const statusName = ["Waiting", "Delivering", "Completed", "Canceled"];

  const getDelivery = async () => {
    const token = Cookies.get("token");
    const resDelivery = await handleGetDeliveryByToken(token);
    // console.log(resDelivery.data);
    setListDelivery(resDelivery.data.$values);
  };

  useEffect(() => {
    getDelivery();
  }, []);

  return (
    <div>
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div className="navigation-bar-vertically-history">
          {/* loi o day */}
          <a
            className="request"
            onClick={() => navigate("/Breeder/HistoryRequest")}
          >
            Request
          </a>
          <a className="koi" onClick={() => navigate("/Breeder/FishList")}>
            KOI
          </a>
          <a
            className="koi"
            onClick={() => navigate("/Breeder/HistoryDelivery")}
          >
            Delivery
          </a>
        </div>
        <div className="right-content">
          {/* <div className="search">
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
          </div> */}
          <table className="table-manage-request">
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
            <tbody>
              {listDelivery?.length > 0 ? (
                listDelivery
                  .filter(
                    (delivery) => delivery !== null && delivery !== undefined
                  )
                  .sort((a, b) => b.deliveryId - a.deliveryId)
                  .map((delivery, index) => {
                    {
                      /* if (delivery) { */
                    }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{delivery.deliveryId}</td>
                        <td>{delivery.fishEntryId}</td>
                        <td>
                          {delivery.startDate
                            ? new Date(delivery.startDate).toLocaleString()
                            : ""}
                        </td>
                        {/* <td>{koi.createBy}</td> */}
                        <td>{statusName[delivery.status - 1]}</td>
                        <td>
                          <a
                            onClick={() =>
                              navigate("/Breeder/Delivery", {
                                state: { fishEntryId: delivery.fishEntryId },
                              })
                            }
                          >
                            <i className="fa-solid fa-arrow-right"></i>
                          </a>
                        </td>
                      </tr>
                    );
                    {
                      /* } */
                    }
                  })
              ) : (
                <tr>
                  <td className="spanCol" colSpan="6">
                    No Delivery Data
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

export default DeliveryLsit;

import React, { useEffect, useState } from "react";
import "./ManageDelivery.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleGetAllDelivery } from "../../../axios/UserService";

const ManageDelivery = () => {
  const navigate = useNavigate();
  const [listDelivery, setListDelivery] = useState([]);
  const statusName = ["Waiting", "Delivering", "Completed", "Canceled"];

  const getListAll = async () => {
    const resList = await handleGetAllDelivery();
    // console.log(resList.data.$values);
    setListDelivery(resList.data.$values);
  };

  useEffect(() => {
    getListAll();
  }, []);

  return (
    <div className="manage-delivery-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <table className="table-manage-delivery">
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
                listDelivery.map((delivery, index) => {
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
                            navigate("/Manager/DeliveryDetail", {
                              state: { fishEntryId: delivery.fishEntryId },
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

export default ManageDelivery;

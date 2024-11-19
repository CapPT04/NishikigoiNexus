import "./Delivery.scss";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import {
  handleFishEntryById,
  handleGetDeliveryByFishEntry,
  handleUserById,
} from "../../../axios/UserService";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "upload/ConfigUpload";
import { v4 } from "uuid";

const Delivery = () => {
  const navigate = useNavigate();
  const fishEntryId = useLocation().state?.fishEntryId;
  const statusName = ["Waiting", "Delivering", "Completed", "Canceled"];
  const [delivery, setDelivery] = useState("");
  const [staff, setStaff] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [reason, setReason] = useState("");
  const [fishEntry, setFishEntry] = useState("");

  const formatMoney = (value) => {
    // Ensure the value is a number or a string
    let [integerPart, decimalPart] = String(value).split(".");
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted number with the decimal part (if present)
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };

  const getAllInfo = async () => {
    const resDelivery = await handleGetDeliveryByFishEntry(fishEntryId);
    // console.log(resDelivery.data);
    setDelivery(resDelivery.data);
    if (resDelivery.data.updateBy) {
      const resStaff = await handleUserById(resDelivery.data.updateBy);
      setStaff(resStaff.data);
    }
    const resFishEntry = await handleFishEntryById(
      resDelivery.data.fishEntryId
    );
    // console.log("entry:", resFishEntry.data);
    setFishEntry(resFishEntry.data);
  };

  useEffect(() => {
    if (!fishEntryId) {
      // navigate("/");
    } else {
      getAllInfo();
    }
  }, []);

  return (
    <div className="delivery-detail-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="deltail-content">
        <div className="delivery-content">
          <div className="delivery-content-row1">
            <div className="status">
              Status: {statusName[delivery.deliveryStatus - 1]}
            </div>
            {/* <select name="" id="" className="set-status">
            <option value="">Set status &nbsp;&nbsp; v</option>
          </select> */}
          </div>
          <div className="delivery-content-row2">Delivery Detail</div>
          <div className="delivery-content-row5">
            <div className="delivery-cost">
              <label htmlFor="delivery-input" className="delivery-label">
                Delivery Cost
              </label>
              <input
                type="text"
                className="delivery-input"
                disabled={delivery.deliveryStatus !== 1}
                defaultValue={
                  delivery.deliveryCost > 0
                    ? formatMoney(delivery.deliveryCost) + " VND"
                    : ""
                }
                onChange={(e) => setDeliveryCost(e.target.value)}
              />
            </div>
            <div className="update-by">
              <label htmlFor="update-by-input" className="update-by-label">
                Update By
              </label>
              <input
                type="text"
                className="update-by-input"
                value={staff ? staff.firstName + " " + staff.lastName : ""}
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row5">
            <div className="update-by">
              <label htmlFor="update-by-input" className="update-by-label">
                Payment Date
              </label>
              <input
                type="text"
                className="update-by-input"
                value={
                  delivery.startDate
                    ? new Date(delivery.startDate).toLocaleString()
                    : new Date(delivery.payDate).toLocaleString()
                }
                disabled={true}
              />
            </div>
            <div className="last-update">
              {" "}
              <label htmlFor="last-update-input" className="last-update-label">
                Complete Date
              </label>
              <input
                type="datetime"
                className="last-update-input"
                value={
                  delivery.endDate
                    ? new Date(delivery.endDate).toLocaleString()
                    : "Not Complete Yet"
                }
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row5">
            <div
              className="update-by"
              onClick={() =>
                navigate(`/Breeder/DetailRequest?id=${fishEntry.requestId}`)
              }
            >
              <label htmlFor="update-by-input" className="update-by-label">
                Fish Entry ID
              </label>
              <input
                type="text"
                className="update-by-input"
                value={fishEntry.fishEntryId}
                disabled={true}
              />
            </div>
            <div
              className="last-update"
              onClick={() =>
                navigate(`/Breeder/DetailFish?FishId=${fishEntry.fishId}`)
              }
            >
              <label htmlFor="last-update-input" className="last-update-label">
                Fish ID
              </label>
              <input
                type="text"
                className="last-update-input"
                value={fishEntry.fishId}
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row6">
            <div className="last-update">
              <label htmlFor="last-update-input" className="last-update-label">
                Auction End Date
              </label>
              <input
                type="datetime"
                className="last-update-input"
                value={
                  fishEntry.endDate
                    ? new Date(fishEntry.endDate).toLocaleString()
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="update-by">
              <label htmlFor="update-by-input" className="update-by-label">
                Amount Received
              </label>
              <input
                type="text"
                className="update-by-input"
                value={
                  formatMoney(fishEntry.highestPrice - delivery.deliveryCost) +
                  " VND"
                }
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row6">
            <div className="fish-name">
              <label htmlFor="fish-name-input" className="fish-name-label">
                Winner Name
              </label>
              <input
                type="text"
                className="fish-name-input"
                value={delivery.winnerName}
                disabled={true}
              />
            </div>
            <div className="origin">
              <label htmlFor="origin-input" className="origin-label">
                Phone
              </label>
              <input
                type="text"
                className="origin-input"
                value={delivery.phone}
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row7">
            <div className="shape">
              <label htmlFor="shape-input" className="shape-label">
                Address
              </label>
              <input
                type="text"
                className="shape-input"
                value={delivery.address}
                disabled={true}
              />
            </div>
            <div className="size">
              <label htmlFor="size-input" className="size-label">
                City
              </label>
              <input
                type="text"
                className="origin-input"
                value={delivery.city}
                disabled={true}
              />
            </div>
          </div>
          <div className="delivery-content-row2">Delivery Result</div>
          <div className="delivery-content-row8">
            {(delivery.deliveryStatus === 3 ||
              delivery.deliveryStatus === 4) && (
              <>
                {/* input */}
                <div
                  className="reason"
                  style={{
                    display: delivery.deliveryStatus === 4 ? "" : "none",
                  }}
                >
                  <label htmlFor="reason-input" className="reason-label">
                    Reason (If Cancel)
                  </label>
                  <input
                    type="text"
                    className="reason-input"
                    defaultValue={delivery.reason ? delivery.reason : ""}
                    disabled={
                      delivery.deliveryStatus === 3 ||
                      delivery.deliveryStatus === 4
                    }
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                {/* img */}
                <div className="img-result">
                  <label
                    htmlFor="img-result-input"
                    className="img-result-label"
                  >
                    Image
                  </label>

                  <div className="imgInput">
                    {delivery.deliveryImage ? (
                      <img src={delivery.deliveryImage} className="imgKoi" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            )}
            {delivery.deliveryStatus !== 3 && delivery.deliveryStatus !== 4 && (
              <div className="delivery-content-row2">
                Delivery not completed/canceled
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

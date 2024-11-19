import "./DeliveryDetail.scss";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import {
  handleApproveDelivery,
  handleCancelDelivery,
  handleCompleteDelivery,
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

const DeliveryDetail = () => {
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
    console.log(resDelivery.data);
    setDelivery(resDelivery.data);
    if (resDelivery.data.updateBy) {
      const resStaff = await handleUserById(resDelivery.data.updateBy);
      setStaff(resStaff.data);
    }
    const resFishEntry = await handleFishEntryById(
      resDelivery.data.fishEntryId
    );
    console.log("entry:", resFishEntry.data);
    setFishEntry(resFishEntry.data);
  };

  useEffect(() => {
    if (!fishEntryId) {
      navigate("/");
    } else {
      getAllInfo();
    }
  }, []);

  const approveDelivery = () => {
    if (deliveryCost > 0 && deliveryCost % 1000 === 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve Delivery!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = Cookies.get("token");
          const res = await handleApproveDelivery(
            token,
            delivery.deliveryId,
            deliveryCost
          );
          if (res.status === 200) {
            toast.success("Approve Delivery Sucessfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error(res.data, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // window.location.reload();
          }
        }
      });
    } else {
      toast.error("Delivery Cost is Invalid", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const cancelDelivery = () => {
    if (reason.length > 0 && img) {
      Swal.fire({
        title: "Are you sure to cancel the delivery?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel Delivery",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = Cookies.get("token");
          const res = await handleCancelDelivery(
            token,
            delivery.deliveryId,
            img,
            reason
          );
          if (res.status === 200) {
            toast.success("Cancel the Delivery Sucessfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error(res.data, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // window.location.reload();
          }
        }
      });
    } else {
      toast.error("Reason and Image is required", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const completeDelivery = () => {
    if (img) {
      Swal.fire({
        title: "Are you sure to complete the delivery?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Complete Delivery!",
        cancelButtonText: "No, Cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = Cookies.get("token");
          const res = await handleCompleteDelivery(
            token,
            delivery.deliveryId,
            img
          );
          if (res.status === 200) {
            toast.success("Cancel the Delivery Sucessfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error(res.data, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // window.location.reload();
          }
        }
      });
    } else {
      toast.error("Image is required", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  //----------- upload anh----------
  const [img, setImg] = useState("");
  const fileInputRef = useRef(null);
  const handleUpload = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
    try {
      const imgRef = ref(imageDB, `KoiImages/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImg(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };
  const handleButtonClick = () => {
    delivery.deliveryImage = null;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="blog-detail-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body-content">
        <ToastContainer />
        <VerticallyNavbar />
        <div className="body-content-right">
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
            <div className="approve-delivery-row">
              <button
                className={`approve-delivery-btn ${
                  deliveryCost > 0 ? "" : "btn-off"
                }`}
                onClick={approveDelivery}
                style={{ display: delivery.deliveryStatus === 1 ? "" : "none" }}
              >
                Approve Delivery
              </button>
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
                <label
                  htmlFor="last-update-input"
                  className="last-update-label"
                >
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
                  navigate("/Manager/FishEntryDetail", {
                    state: fishEntry,
                  })
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
                  navigate("/Manager/KoiDetail", {
                    state: { koi: fishEntry },
                  })
                }
              >
                <label
                  htmlFor="last-update-input"
                  className="last-update-label"
                >
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
              <div className="update-by">
                <label htmlFor="update-by-input" className="update-by-label">
                  Winner Price
                </label>
                <input
                  type="text"
                  className="update-by-input"
                  value={formatMoney(fishEntry.highestPrice) + " VND"}
                  disabled={true}
                />
              </div>
              <div className="last-update">
                <label
                  htmlFor="last-update-input"
                  className="last-update-label"
                >
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
            </div>
            <div className="delivery-content-row6">
              <div className="update-by">
                <label htmlFor="update-by-input" className="update-by-label">
                  Winner Payment Amount
                </label>
                <input
                  type="text"
                  className="update-by-input"
                  value={formatMoney(delivery.amount) + " VND"}
                  disabled={true}
                />
              </div>
              <div className="last-update">
                <label
                  htmlFor="last-update-input"
                  className="last-update-label"
                >
                  Breeder Receive
                </label>
                <input
                  type="text"
                  className="last-update-input"
                  value={
                    formatMoney(
                      fishEntry.highestPrice - delivery.deliveryCost
                    ) + " VND"
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
              {/* input */}
              <div
                className="reason"
                style={{
                  display: delivery.deliveryStatus !== 3 ? "" : "none",
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
                <label htmlFor="img-result-input" className="img-result-label">
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <div
                  className="imgInput"
                  onClick={
                    delivery.deliveryStatus === 1 ||
                    delivery.deliveryStatus === 2
                      ? handleButtonClick
                      : undefined
                  }
                >
                  {delivery.deliveryImage ? (
                    <img
                      src={img || delivery.deliveryImage}
                      className="imgKoi"
                    />
                  ) : img ? (
                    <img src={img} className="imgKoi" />
                  ) : (
                    <div className="plus-icon"></div>
                  )}
                  {}
                </div>
              </div>
            </div>
            {/* btn */}
            <div
              className="delivery-content-row10"
              style={{
                display:
                  delivery.deliveryStatus !== 3 && delivery.deliveryStatus !== 4
                    ? ""
                    : "none",
              }}
            >
              <button className="complete-btn" onClick={completeDelivery}>
                Complete Delivery
              </button>
              <button className="cancel-btn" onClick={cancelDelivery}>
                Cancel Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetail;

import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleGetFishDetailById,
  handleGetFishImgById,
} from "../../../axios/UserService";
import "./FishDetail.scss";

const FishDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fishID = searchParams.get("FishId");

  const [myFish, setMyFish] = useState("");
  const [images, setImages] = useState([]);
  const genderName = ["Male", "Female"];
  const statusName = ["Available", "Sold"];

  const getInfoDetail = async () => {
    const resFish = await handleGetFishDetailById(fishID);
    // console.log(resFish);
    setMyFish(resFish.data);
    const resIMG = await handleGetFishImgById(fishID);
    for (let i = 0; i < resIMG.data.$values.length; i++) {
      setImages((prev) => [...prev, resIMG.data.$values[i].imagePath]);
    }
    // console.log(resIMG.data.$values);
    setMyFish(resFish.data);
    // console.log(images);
  };
  useEffect(() => {
    getInfoDetail();
  }, []);
  return (
    <div className="request-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <div className="request-detail-content">
          <div className="request-detail-content-row1">
            <div className="status">
              Status: {statusName[myFish.status - 1]}
            </div>
          </div>
          <div className="request-detail-content-row2">
            Fish #{myFish.fishId} Detail
          </div>
          <div className="request-detail-content-row3">
            Create date:{" "}
            {myFish.createDate
              ? new Date(myFish.createDate).toLocaleString()
              : "Not Yet"}
          </div>
          <div className="request-detail-content-row4">
            <div className="update-by">
              <label htmlFor="update-by-input" className="update-by-label">
                Fish Name
              </label>
              <input
                type="text"
                className="update-by-input"
                value={myFish.fishName ? myFish.fishName : ""}
                disabled={true}
              />
            </div>
            <div className="update-date">
              {" "}
              <label htmlFor="update-date-input" className="update-date-label">
                Fish Origin
              </label>
              <input
                type="datetime"
                className="update-date-input"
                value={myFish.origin ? myFish.origin : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row5">
            <div className="create-by">
              <label htmlFor="create-by-input" className="create-by-label">
                Fish Shape
              </label>
              <input
                type="text"
                className="create-by-input"
                value={myFish.shape ? myFish.shape : ""}
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label
                htmlFor="expected-date-input"
                className="expected-date-label"
              >
                Fish size (mm)
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={myFish.size ? myFish.size : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row6">
            <div className="delivery-cost">
              <label
                htmlFor="delivery-cost-input"
                className="delivery-cost-label"
              >
                Gender
              </label>
              <input
                type="text"
                className="delivery-cost-input"
                value={
                  myFish.gender ? genderName[myFish.gender - 1] : "Unknown"
                }
                disabled={true}
              />
            </div>
            <div className="fee">
              {" "}
              <label htmlFor="fee-input" className="fee-label">
                Fish Age (months)
              </label>
              <input
                type="number"
                className="fee-input"
                value={myFish.age ? myFish.age : 0}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row6">
            <div className="delivery-cost">
              <label
                htmlFor="delivery-cost-input"
                className="delivery-cost-label"
              >
                Fish Weight (gram)
              </label>
              <input
                type="text"
                className="delivery-cost-input"
                value={myFish.weight ? myFish.weight : 0}
                disabled={true}
              />
            </div>
            <div className="fee">
              {" "}
              <label htmlFor="fee-input" className="fee-label">
                Pond City
              </label>
              <input
                type="text"
                className="fee-input"
                value={myFish.pondCity ? myFish.pondCity : ""}
                disabled={true}
              />
            </div>
          </div>
          <div className="request-detail-content-row7">
            <label htmlFor="note-input" className="note-label">
              Pond Address
            </label>
            <input
              type="text"
              className="note-input"
              value={myFish.pondAddress ? myFish.pondAddress : ""}
              disabled={true}
            />
          </div>
          {/* chen anh o day */}
          <div className="request-detail-content-row9">
            <label htmlFor="note-input" className="note-label">
              Fish Images
            </label>
            <div className="fish-images">
              <img
                src={images[0] ? images[0] : ""}
                alt=""
                style={{ display: images[0] ? "" : "none" }}
              />
              <img
                src={images[1] ? images[1] : ""}
                alt=""
                style={{ display: images[1] ? "" : "none" }}
              />
              <img
                src={images[2] ? images[2] : ""}
                alt=""
                style={{ display: images[2] ? "" : "none" }}
              />
              <img
                src={images[3] ? images[3] : ""}
                alt=""
                style={{ display: images[3] ? "" : "none" }}
              />
            </div>
          </div>
          {/* {myRequest.status === 3 && (
            <div className="request-detail-content-row16">
              <label htmlFor="note-input" className="note-label">
                Payment Date
              </label>
              <input
                type="text"
                className="note-input"
                value={myRequest.paymentDate ? myRequest.paymentDate : ""}
                disabled={true}
              />
            </div>
          )} */}

          {/* <div className="request-detail-content-row5">
            <div className="create-by">
              <label htmlFor="create-by-input" className="create-by-label">
                Auction ID
              </label>
              <input
                type="text"
                className="create-by-input"
                value={fishEntry.auctionId ? fishEntry.auctionId : ""}
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label htmlFor="expected-date-input" className="expected-date-label">
                Fish ID
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.fishId ? fishEntry.fishId : 0}
                disabled={true}
              />
            </div>
          </div> */}
          {/* <div className="request-detail-content-row5">
            <div className="create-by">
              <label htmlFor="create-by-input" className="create-by-label">
                Start Date
              </label>
              <input
                type="text"
                className="create-by-input"
                value={
                  fishEntry.startDate ? fishEntry.startDate : "Not started yet"
                }
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label htmlFor="expected-date-input" className="expected-date-label">
                End Date
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.endDate ? fishEntry.endDate : "Not ended yet"}
                disabled={true}
              />
            </div>
          </div> */}
          {/* <div className="request-detail-content-row17">
            <div className="create-by">
              <label htmlFor="create-by-input" className="create-by-label">
                Highest Bidder
              </label>
              <input
                type="text"
                className="create-by-input"
                value={
                  fishEntry.highestBidder
                    ? bidder.firstName + " " + bidder.lastName
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="expected-date">
              {" "}
              <label htmlFor="expected-date-input" className="expected-date-label">
                Highest Price
              </label>
              <input
                type="datetime"
                className="expected-date-input"
                value={fishEntry.highestPrice ? fishEntry.highestPrice : ""}
                disabled={true}
              />
            </div>
          </div> */}
          {/* {myRequest.status === 2 && (
            <div className="request-detail-content-row18">
              <button
                className="send-payment-request-btn"
                onClick={handlePayFee}
              >
                Pay Request Fee
              </button>
            </div>
          )} */}
          {/* {myRequest.status === 1 && (
            <div className="request-detail-content-row18">
              <button
                className="send-cancel-request-btn"
                onClick={handleCancel}
              >
                Cancel Request
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FishDetail;

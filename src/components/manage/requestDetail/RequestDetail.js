import React from "react";
import "./RequestDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";

const RequestDetail = () => {
  return (
    <div className="request-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="request-detail-content">
            <div className="request-detail-content-row1">
              <div className="status">Status: Active</div>
              <select name="" id="" className="set-status">
                <option value="">Set status &nbsp;&nbsp; v</option>
              </select>
            </div>
            <div className="request-detail-content-row2">Request Detail</div>
            <div className="request-detail-content-row3">
              Create date: YYYY/MM/DD hh:mm:ss
            </div>
            <div className="request-detail-content-row4">
              <div className="update-by">
                <label for="update-by-input" className="update-by-label">
                  Update By
                </label>
                <input type="text" className="update-by-input" value="Thinh" />
              </div>
              <div className="update-date">
                {" "}
                <label for="update-date-input" className="update-date-label">
                  Update Date
                </label>
                <input
                  type="datetime"
                  className="update-date-input"
                  value="YYYY/MM/DD hh:mm:ss"
                />
              </div>
            </div>
            <div className="request-detail-content-row5">
              <div className="create-by">
                <label for="create-by-input" className="create-by-label">
                  Create By
                </label>
                <input type="text" className="create-by-input" value="Thinh" />
              </div>
              <div className="expected-date">
                {" "}
                <label
                  for="expected-date-input"
                  className="expected-date-label"
                >
                  Expected Date
                </label>
                <input
                  type="datetime"
                  className="expected-date-input"
                  value="YYYY/MM/DD"
                />
              </div>
            </div>
            <div className="request-detail-content-row6">
              <div className="delivery-cost">
                <label
                  for="delivery-cost-input"
                  className="delivery-cost-label"
                >
                  Delivery Cost
                </label>
                <input
                  type="number"
                  className="delivery-cost-input"
                  value="1234"
                />
              </div>
              <div className="fee">
                {" "}
                <label for="fee-input" className="fee-label">
                  Fee
                </label>
                <input type="number" className="fee-input" value="1534" />
              </div>
            </div>
            <div className="request-detail-content-row7">
              <label for="note-input" className="note-label">
                Note
              </label>
              <input type="text" className="note-input" value="Note zo day" />
            </div>
            <div className="request-detail-content-row8">
              <button className="send-payment-request-btn">
                Send Payment Request
              </button>
            </div>
            <div className="request-detail-content-row9">
              <div className="fish-entry-information">
                Fish Entry Information
              </div>
            </div>

            <div className="request-detail-content-row10">
              <div className="fish-id">
                <label for="fish-id-input" className="fish-id-label">
                  Fish ID
                </label>
                <input type="text" className="fish-id-input" value="1" />
              </div>
              <div className="auction-id">
                {" "}
                <label for="auction-id-input" className="auction-id-label">
                  Auction ID
                </label>
                <input type="text" className="auction-id-input" value="1534" />
              </div>
            </div>

            <div className="request-detail-content-row11">
              <div className="auction-method">
                <label
                  for="auction-method-input"
                  className="auction-method-label"
                >
                  Auction Method
                </label>
                <input type="text" className="auction-method-input" value="1" />
              </div>
              <div className="increment">
                {" "}
                <label for="increment-input" className="increment-label">
                  Increment
                </label>
                <input type="text" className="increment-input" value="1534" />
              </div>
            </div>
            <div className="request-detail-content-row12">
              <div className="min-price">
                <label for="min-price-input" className="min-price-label">
                  Min Price
                </label>
                <input type="number" className="min-price-input" value="1" />
              </div>
              <div className="max-price">
                {" "}
                <label for="max-price-input" className="max-price-label">
                  Max Price
                </label>
                <input type="number" className="max-price-input" value="1534" />
              </div>
            </div>

            <div className="request-detail-content-row13">
              <div className="expected-date">
                <label
                  for="expected-date-input"
                  className="expected-date-label"
                >
                  Expected Date
                </label>
                <input type="datetime" className="min-price-input" value="1" />
              </div>
              <div className="start-date">
                {" "}
                <label for="start-date-input" className="start-date-label">
                  Start Date
                </label>
                <input
                  type="datetime"
                  className="start-date-input"
                  value="1534"
                />
              </div>
            </div>
            <div className="request-detail-content-row14">
              <div className="end-date">
                <label for="end-date-input" className="end-date-label">
                  End Date
                </label>
                <input type="datetime" className="end-date-input" value="1" />
              </div>
              <div className="highest-price">
                {" "}
                <label
                  for="highest-price-input"
                  className="highest-price-label"
                >
                  Highest Price
                </label>
                <input
                  type="datetime"
                  className="highest-price-input"
                  value="1534"
                />
              </div>
            </div>
            <div className="request-detail-content-row15">
              <div className="deny">Deny</div>
            </div>
            <div className="request-detail-content-row16">
              <label for="reason-input" className="reason-label">
                Reason
              </label>
              <input
                type="text"
                className="reason-input"
                value="diu chiu tra tien"
              />
            </div>
            <div className="request-detail-content-row17">
              <button className="deny-btn">Deny</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;

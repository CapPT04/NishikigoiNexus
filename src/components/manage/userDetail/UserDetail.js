import React from "react";
import "./UserDetail.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { useSearchParams } from "react-router-dom";

const UserDetail = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="member-detail-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="member-detail-content">
            <div className="member-detail-content-row1">
              <div className="status">Status: Active</div>
              {/* <select name="" id="" className="set-status">
            <option value="">Set status &nbsp;&nbsp; v</option>
          </select> */}
            </div>
            <div className="member-detail-content-row2">Member Detail</div>
            <div className="member-detail-content-row3">
              Create date: YYYY/MM/DD hh:mm:ss
            </div>

            <div className="member-detail-content-row4">
              <div className="email">
                <label for="email-input" className="email-label">
                  Email
                </label>
                <input
                  type="text"
                  className="email-input"
                  value="thinhdlse181755@fpt.edu.vn"
                />
              </div>
              <div className="gender">
                {" "}
                <label for="gender-input" className="gender-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="gender-input"
                  value="0362xxx366"
                />
              </div>
            </div>
            <div className="member-detail-content-row5">
              <div className="first-name">
                <label for="first-name-input" className="first-name-label">
                  First Name
                </label>
                <input type="text" className="first-name-input" value="Thinh" />
              </div>
              <div className="last-name">
                {" "}
                <label for="last-name-input" className="last-name-label">
                  Last Name
                </label>
                <input type="text" className="last-name-input" value="Dinh" />
              </div>
            </div>
            <div className="member-detail-content-row6">
              <div className="phone">
                {" "}
                <label for="phone-input" className="phone-label">
                  Phone
                </label>
                <input type="text" className="phone-input" value="0362xxx366" />
              </div>
              <div className="city">
                <label for="city-input" className="city-label">
                  City
                </label>
                <input type="text" className="city-input" value="Tra Vinh" />
              </div>
            </div>
            <div className="member-detail-content-row7">
              <label for="address-input" className="address-label">
                Address
              </label>
              <input type="text" className="address-input" value="Tra Vinh" />
            </div>
            <div className="member-detail-content-row8">
              <div className="ban-unban">Ban / Unban</div>
            </div>
            <div className="member-detail-content-row9">
              <label for="reason-input" className="reason-label">
                Reason
              </label>
              <input
                type="text"
                className="reason-input"
                value="Customer didn't pay"
              />
            </div>
            <div className="member-detail-content-row10">
              <button className="ban-btn">Ban</button>
              <button className="unban-btn">Unban</button>
            </div>

            {/* <div className="member-detail-content-row11">
          <div className="bidding-history">Bidding History</div>
        </div>
        <div className="member-detail-content-row12">
          <table className="table-request-history">
            <tr>
              <th>No.</th>
              <th>Fish Id</th>
              <th>Bidding date</th>
              <th>Amount bidding</th>
            </tr>
            <tr>
              <td>1</td>
              <td>fish 1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>1234</td>
            </tr>
            <tr>
              <td>1</td>
              <td>fish 1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>1234</td>
            </tr>
            <tr>
              <td>1</td>
              <td>fish 1</td>
              <td>YYYY/MM/DD hh:mm:ss</td>
              <td>1234</td>
            </tr>
          </table>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

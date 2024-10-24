import React, { useEffect, useState } from "react";
import "./KoiDetail.scss";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleUserById } from "../../../axios/UserService";

const KoiDetail = () => {
  const koi = useLocation().state;
  const [breeder, setBreeder] = useState("");
  const [staff, setStaff] = useState("");
  const getInfo = async () => {
    const res = await handleUserById(koi.createBy);
    setBreeder(res.data);
    const resStaff = await handleUserById(koi.updateBy);
    setStaff(resStaff.data);
  };
  useEffect(() => {
    console.log(koi);
    getInfo();
  }, []);
  return (
    <div className="blog-detail-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="fish-detail-content">
            <div className="fish-detail-content-row1">
              <div className="status">
                Status: {koi.status === 1 ? "Available" : "Sold"}
              </div>
              {/* <select name="" id="" className="set-status">
                <option value="">Set status &nbsp;&nbsp; v</option>
              </select> */}
            </div>
            <div className="fish-detail-content-row2">Fish Detail</div>
            <div className="fish-detail-content-row3">
              Create date: {new Date(koi.createDate).toLocaleString()}
            </div>
            <div className="fish-detail-content-row4">
              <label for="create-by-input" className="create-by-label">
                Create By
              </label>
              <input
                type="text"
                className="create-by-input"
                value={breeder.firstName + " " + breeder.lastName}
                disabled={true}
              />
            </div>
            <div className="fish-detail-content-row5">
              <div className="update-by">
                <label for="update-by-input" className="update-by-label">
                  Update By
                </label>
                <input
                  type="text"
                  className="update-by-input"
                  value={staff.firstName + " " + staff.lastName}
                  disabled={true}
                />
              </div>
              <div className="last-update">
                {" "}
                <label for="last-update-input" className="last-update-label">
                  Last Update
                </label>
                <input
                  type="datetime"
                  className="last-update-input"
                  value={
                    koi.updateDate
                      ? new Date(koi.updateDate).toLocaleString()
                      : "Not updated yet"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row6">
              <div className="fish-name">
                <label for="fish-name-input" className="fish-name-label">
                  Fish Name
                </label>
                <input
                  type="text"
                  className="fish-name-input"
                  value={koi.fishName}
                  disabled={true}
                />
              </div>
              <div className="origin">
                <label for="origin-input" className="origin-label">
                  Origin
                </label>
                <input
                  type="text"
                  className="origin-input"
                  value={koi.origin}
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row7">
              <div className="shape">
                <label for="shape-input" className="shape-label">
                  Shape
                </label>
                <input
                  type="text"
                  className="shape-input"
                  value={koi.shape}
                  disabled={true}
                />
              </div>
              <div className="size">
                <label for="size-input" className="size-label">
                  Size
                </label>
                <input
                  type="text"
                  className="origin-input"
                  value={`${koi.size} mm`}
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row8">
              <div className="gender">
                <label for="gender-input" className="gender-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="gender-input"
                  value={koi.gender === 1 ? "Male" : "Female"}
                  disabled={true}
                />
              </div>
              <div className="age">
                <label for="age-input" className="age-label">
                  Age
                </label>
                <input
                  type="text"
                  className="age-input"
                  value={`${koi.age} month`}
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row9">
              <div className="weight">
                <label for="weight-input" className="weight-label">
                  Weight
                </label>
                <input
                  type="text"
                  className="weight-input"
                  value={`${koi.weight} gram`}
                  disabled={true}
                />
              </div>
              <div className="sold-price">
                <label for="sold-price-input" className="sold-price-label">
                  Pond City
                </label>
                <input
                  type="text"
                  className="sold-price-input"
                  value={koi.pondCity}
                  disabled={true}
                />
              </div>
            </div>
            <div className="fish-detail-content-row4">
              <label for="create-by-input" className="create-by-label">
                Pond Address
              </label>
              <input
                type="text"
                className="create-by-input"
                value={koi.pondAddress}
                disabled={true}
              />
            </div>

            <div className="fish-detail-content-row10">
              {/* <button className="update-btn">Update</button>
              <button className="cancel-btn">Cancel</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoiDetail;

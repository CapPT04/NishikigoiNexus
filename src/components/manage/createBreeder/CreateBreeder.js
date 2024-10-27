import React, { useState } from "react";
import "./CreateBreeder.scss";
import { useNavigate } from "react-router-dom";
import { handleCreateBreeder } from "../../../axios/UserService";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const CreateBreeder = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [commission, setCommission] = useState(0);

  const createBreeder = async () => {
    const token = sessionStorage.getItem("token");
    const breeder = {
      firstName,
      lastName,
      email,
      password,
      city,
      address,
      phone,
      commission,
    };
    try {
      //   console.log(token);
      //cố định gender của breeder
      const res = await handleCreateBreeder(token, breeder);
      //   console.log(res.data.message);
      if (res && res.status === 200) {
        toast.success("Breeder created successfully! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/Manager/ManageBreeder");
        }, 3500);
      } else {
        // console.log(res.data.message);
        toast.error(`${res.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`Create Breeder Failed. Try again ...}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="create-breeder-page">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="create-breeder-background">
        <div className="create-breeder-content">
          <div className="create-breeder-content-row1">Breeder Information</div>
          <div className="create-breeder-content-row2">
            <div className="first-name">
              <label htmlFor="first-name-input" className="first-name-label">
                First Name
              </label>
              <input
                type="text"
                className="first-name-input"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="last-name">
              <label htmlFor="last-name-input" className="last-name-label">
                Last Name
              </label>
              <input
                type="text"
                className="last-name-input"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="create-breeder-content-row3">
            <label htmlFor="email-input" className="email-label">
              Email
            </label>
            <input
              type="text"
              className="email-input"
              placeholder="Enter Breeder Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="create-breeder-content-row4">
            <label htmlFor="password-input" className="password-label">
              Password
            </label>
            <input
              type="text"
              className="password-input"
              placeholder="Enter Breeder Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="create-breeder-content-row5">
            <div className="commission">
              <label htmlFor="commission-input" className="commission-label">
                Commission
              </label>
              <input
                type="text"
                className="commission-input"
                placeholder="Enter Breeder Commission"
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
            <div className="city">
              <label htmlFor="city-input" className="city-label">
                City
              </label>
              <input
                type="text"
                className="city-input"
                placeholder="Enter Breeder City"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="create-breeder-content-row6">
            <label htmlFor="address-input" className="address-label">
              Address
            </label>
            <input
              type="text"
              className="address-input"
              placeholder="Enter Breeder Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="create-breeder-content-row7">
            <label htmlFor="phone-input" className="phone-label">
              Phone
            </label>
            <input
              type="tel"
              className="phone-input"
              placeholder="Enter Breeder Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* <div className="create-breeder-content-row8">
            <label htmlFor="commission-input" className="commission-label">
              Commission
            </label>
            <input type="text" className="commission-input" value="wtf" />
          </div> */}
          <div className="create-breeder-content-row9">
            <button className="create-btn" onClick={createBreeder}>
              Create
            </button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBreeder;

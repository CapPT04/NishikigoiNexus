import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import api from "../../../config/axios";

import "./SignupPage.scss";

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignUp = async () => {
    // const values = {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    //   phone: phoneNumber,
    // };
    // try {
    //   const response = await api.post("User/MemberRegister", values);
    //   console.log(response);
    //   navigate("/");
    // } catch (err) {
    //   console.log(err.response ? err.response.data : err.message);
    //   alert(err.response?.data);
    // }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <div className="left-content">
          <div className="logo-name">
            <div className="logo"></div>
            <div className="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div className="right-content">
          <div className="signup-form">
            <div className="signup-form-title">Sign Up</div>
            <div className="signup-form-content">
              <div className="full-name">
                <div className="first-name">
                  <div className="first-name-title">First Name</div>
                  <input
                    className="first-name-input"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="last-name">
                  <div className="last-name-title">Last Name</div>
                  <input
                    className="last-name-input"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="email">
                <div className="email-title">Email</div>
                <input
                  className="email-input"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <div className="password-title">Password</div>
                <input
                  className="password-input"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="confirm-password">
                <div className="confirm-password-title">Confirm Password</div>
                <input className="confirm-password-input" type="password" />
              </div>
              <div className="phone-number">
                <div className="phone-number-title">Phone Number</div>
                <input
                  className="phone-number-input"
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="signup-and-login">
                <button className="signup-btn" onClick={handleSignUp}>
                  Sign up
                </button>
                <div className="text-with-login">
                  Already have an account?
                  <a className="login" onClick={() => navigate("/login")}>
                    Login
                  </a>
                </div>
              </div>
            </div>
            <div className="note">
              By logging in to Nishikigoi Nexus, we confirm that you have
              carefully read, understood and agree to comply with our{" "}
              <a className="term-of-service" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="private-policy" href="#">
                Privacy Policy
              </a>{" "}
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

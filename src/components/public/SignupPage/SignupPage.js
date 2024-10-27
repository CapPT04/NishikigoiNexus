import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./SignupPage.scss";
import { handleSignUpApi } from "../../../axios/UserService";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [btnNotReady, setBtnNotReady] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasInput, setHasInput] = useState(false);

  const handleSignUp = async () => {
    const user = {
      email,
      password,
      firstName,
      lastName,
      phone: phoneNumber,
    };
    try {
      const response = await handleSignUpApi(user);
      if (response.status === 200) {
        toast.success("Registed successfully! Please Login to continue..", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3500);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    if (hasInput) {
      if (
        !(
          firstName &&
          lastName &&
          email &&
          password &&
          rePassword &&
          phoneNumber
        )
      ) {
        // setErrorMessage("Please fill in all fields");
        setBtnNotReady(true);
      } else if (validateEmail(email) === false) {
        // setErrorMessage("Email is invalid");
        setBtnNotReady(true);
      } else if (rePassword !== password) {
        // setErrorMessage("Wrong confirm password");
        setBtnNotReady(true);
      } else if (!validatePhoneNumber(phoneNumber)) {
        setBtnNotReady(true);
      } else {
        // setErrorMessage("");
        setBtnNotReady(false);
      }
    }
  }, [firstName, lastName, email, password, rePassword, phoneNumber]);

  return (
    <div className="signup-page">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
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
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}{" "}
            <div className="signup-form-content">
              <div className="full-name">
                <div className="first-name">
                  <div className="first-name-title">First Name</div>
                  <input
                    className="first-name-input"
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setHasInput(true);
                    }}
                  />
                </div>
                <div className="last-name">
                  <div className="last-name-title">Last Name</div>
                  <input
                    className="last-name-input"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setHasInput(true);
                    }}
                  />
                </div>
              </div>
              <div className="email">
                <div className="email-title">Email</div>
                <input
                  className="email-input"
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHasInput(true);
                  }}
                  required={true}
                />
              </div>
              <div className="password">
                <div className="password-title">Password</div>
                <input
                  className="password-input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHasInput(true);
                  }}
                />
              </div>
              <div className="confirm-password">
                <div className="confirm-password-title">Confirm Password</div>
                <input
                  className="confirm-password-input"
                  type="password"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                    setHasInput(true);
                  }}
                />
              </div>
              <div className="phone-number">
                <div className="phone-number-title">Phone Number</div>
                <input
                  className="phone-number-input"
                  type="text"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setHasInput(true);
                  }}
                />
              </div>
              <div className="signup-and-login">
                <button
                  className={`signup-btn ${!btnNotReady ? "btn-active" : ""}`}
                  onClick={handleSignUp}
                  disabled={btnNotReady}
                >
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

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.+[\w]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};
export const validatePhoneNumber = (phoneNumber) => {
  // This regex ensures the number starts with 0 and contains only digits
  const regex = /^0[0-9]+$/;
  return regex.test(phoneNumber);
};

export default SignupPage;

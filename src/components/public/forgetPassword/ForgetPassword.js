import React, { useState } from "react";
import "./ForgetPassword.scss";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { handleForgetPasswordApi } from "../../../axios/UserService";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const forgetPassword = async () => {
    if (!validateEmail(email)) {
      toast.error("Wrong format email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const uri = process.env.REACT_APP_URL_WEB + "ResetPassword";
      const res = await handleForgetPasswordApi(email, uri);
      if (res.status == 200) {
        toast.success("Send email reset successful", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/WaitingEmail");
        }, 2000);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="reset-password-page">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="reset-password-content">
        <div className="left-content">
          <div className="logo-name">
            <div className="logo"></div>
            <div className="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div className="right-content">
          <div className="reset-password-form">
            <div className="reset-password-form-title">Forgot password </div>
            <div className="reset-password-form-content">
              <div className="text-note">
                Enter your email and we’ll send a link to reset your password
              </div>

              <div className="email">
                <div className="email-title">Email</div>
                <input
                  className="email-input"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="reset-password-div">
                <button className="reset-password-btn" onClick={forgetPassword}>
                  Reset password
                </button>
                <div className="text-with-reset-password">
                  Already have an account?&nbsp;
                  <a className="login" onClick={() => navigate("/Login")}>
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.+[\w]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

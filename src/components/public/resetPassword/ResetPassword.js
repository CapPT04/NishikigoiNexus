import React, { useState } from "react";
import "./ResetPassword.scss";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { handleResetPasswordApi } from "../../../axios/UserService";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const resetPassword = async () => {
    if (newPass !== confirmNewPass) {
      toast.error("Confirm password does not match with password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const token = searchParams.get("token");
      const res = await handleResetPasswordApi(newPass, token);
      if (res.status === 200) {
        toast.success("Reset password successful. Please login again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/Login");
        }, 2500);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 2000,
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
            <div className="reset-password-form-title">Reset password </div>
            <div className="reset-password-form-content">
              <div className="password">
                <div className="password-title">New Password</div>
                <input
                  className="password-input"
                  type="password"
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <div className="confirm-password">
                <div className="confirm-password-title">
                  Confirm New Password
                </div>
                <input
                  className="confirm-password-input"
                  type="password"
                  onChange={(e) => setConfirmNewPass(e.target.value)}
                />
              </div>

              <div className="reset-password-div">
                <button className="reset-password-btn" onClick={resetPassword}>
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

export default ResetPassword;

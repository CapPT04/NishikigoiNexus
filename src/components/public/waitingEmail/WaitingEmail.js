import React from "react";
import "./WaitingEmail.scss";
import { useNavigate } from "react-router";

const WaitingEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="reset-password-submitted-page">
      <div className="reset-password-submitted-content">
        <div className="left-content">
          <div className="logo-name">
            <div className="logo"></div>
            <div className="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div className="right-content">
          <div className="reset-password-submitted-form">
            <div className="reset-password-submitted-form-title">
              Check your email....
            </div>
            <div className="reset-password-submitted-form-content">
              <div className="check-your-email">
                <div className="check-your-email-text">
                  There should be a link to recover your account.
                </div>
              </div>
              <div className="reset-password-submitted-div">
                <button
                  className="reset-password-submitted-btn"
                  onClick={() => navigate("/Login")}
                >
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingEmail;

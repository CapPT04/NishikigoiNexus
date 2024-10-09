import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./SignupPage.scss";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div class="signup-page">
      <div class="signup-content">
        <div class="left-content">
          <div class="logo-name">
            <div class="logo"></div>
            <div class="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div class="right-content">
          <div class="signup-form">
            <div class="signup-form-title">Sign Up</div>
            <div class="signup-form-content">
              <div class="full-name">
                <div class="first-name">
                  <div class="first-name-title">First Name</div>
                  <input class="first-name-input" type="text" />
                </div>
                <div class="last-name">
                  <div class="last-name-title">Last Name</div>
                  <input class="last-name-input" type="text" name="" id="" />
                </div>
              </div>
              <div class="email">
                <div class="email-title">Email</div>
                <input class="email-input" type="text" />
              </div>
              <div class="password">
                <div class="password-title">Password</div>
                <input class="password-input" type="password" />
              </div>
              <div class="confirm-password">
                <div class="confirm-password-title">Confirm Password</div>
                <input class="confirm-password-input" type="text" />
              </div>
              <div class="phone-number">
                <div class="phone-number-title">Phone Number</div>
                <input class="phone-number-input" type="password" />
              </div>
              <div class="signup-and-login">
                <button class="signup-btn">Sign up</button>
                <div class="text-with-login">
                  Already have an account?
                  <a class="login" onClick={() => navigate("/login")}>
                    Login
                  </a>
                </div>
              </div>
            </div>
            <div class="note">
              By logging in to Nishikigoi Nexus, we confirm that you have
              carefully read, understood and agree to comply with our{" "}
              <a class="term-of-service" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a class="private-policy" href="#">
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

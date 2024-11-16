import React, { useState } from "react";
import "../components/LoginPage.scss";
import { json, useNavigate } from "react-router-dom";
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.svg";
import xIcon from "../assets/images/X.png";
import { handleLoginApi, handleLoginWithGoogleApi } from "../axios/UserService";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loadingAPI, setLoadingAPI] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = JSON.stringify(tokenResponse.access_token);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );
      const result = userInfo.data;
      // console.log(tokenResponse);
      // console.log(userInfo);

      const response = await handleLoginWithGoogleApi(token);
      // console.log(token);
      Cookies.set("token", response.data);
      // console.log("token: ", response.data);
      // console.log(response.status);
      const user = jwtDecode(response.data);
      // console.log(user);
      Cookies.set("user", JSON.stringify(user));

      if (response && userInfo.status === 200 && response.status === 200) {
        navigate("/");
      } else {
        setErrorMessage("Something wrong! Please try again");
      }
    },
  });

  const handleLogin = async () => {
    try {
      setLoadingAPI(true);
      const response = await handleLoginApi(email, password);
      // console.log(response);
      // console.log(response.data);

      Cookies.set("token", response.data);

      if (response && response.status === 200) {
        const user = jwtDecode(response.data);
        // console.log(JSON.stringify(response.data));
        Cookies.set("user", JSON.stringify(user));
        navigate("/");
      } else {
        if (response && response.status === 400) {
          setErrorMessage(response.data.message);
        } else if (response && response.status === 404) {
          setErrorMessage(response.data.message);
        }
      }
      setLoadingAPI(false);
    } catch (error) {}
  };
  return (
    <div className="login-page">
      <div className="login-content">
        <div className="left-content">
          <div className="logo-name">
            <div className="logo"></div>
            <div className="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div className="right-content">
          <div className="login-form">
            <div className="login-form-title">Login</div>
            <div className="login-form-content">
              <div className="email">
                <div className="email-title">Email</div>
                <input
                  className="email-input"
                  type="text"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="password">
                <div className="password-title">Password</div>
                <input
                  className="password-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={isShowPassword ? "text" : "password"}
                />
                {password && (
                  <i
                    className={
                      isShowPassword
                        ? "fa-solid fa-eye-slash"
                        : "fa-solid fa-eye"
                    }
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  ></i>
                )}
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}{" "}
              {/* Hiển thị lỗi */}
              <div className="remember-and-forget">
                <div className="remember">
                  <input className="remember-checkbox" type="checkbox" />
                  <div className="remember-text">Keep me logged in</div>
                </div>
                <a
                  className="forget-account"
                  onClick={() => navigate("/ForgotPassword")}
                >
                  Forgot password?
                </a>
              </div>
              <div className="login-and-signup">
                <button
                  className={email && password ? "active" : ""}
                  onClick={handleLogin}
                  disabled={!email || !password}
                >
                  {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
                  Login
                </button>
                <div className="text-with-login">
                  Don’t have an account?{" "}
                  <a className="login" onClick={() => navigate("/signup")}>
                    Sign up
                  </a>
                </div>
                <div className="or-line">
                  <hr className="left-line" /> or <hr className="right-line" />
                </div>
              </div>
              <div className="login-google" onClick={() => login()}>
                <img className="google-icon" src={googleIcon} alt="Google" />
                <div className="login-google-text">Continue with Google</div>
              </div>
              <div className="login-facebook">
                <img
                  className="facebook-icon"
                  src={facebookIcon}
                  alt="Facebook"
                />
                <div className="login-facebook-text">Coming soon</div>
              </div>
              <div className="login-X">
                <img className="X-icon" src={xIcon} alt="X" />
                <div className="login-X-text">Coming soon</div>
              </div>
            </div>
            <div className="note">
              By logging in to Nishikigoi Nexus, we confirm that you have
              carefully read, understood, and agree to comply with our{" "}
              <a className="term-of-service" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="private-policy" href="#">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

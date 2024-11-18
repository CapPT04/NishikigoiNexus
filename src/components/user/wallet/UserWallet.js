import React, { useEffect, useRef, useState } from "react";
import "./UserWallet.scss";
import Navbar from "../../common/Navbar/Navbar";
import logo from "../../../assets/images/logo_png.png";
import {
  handleBalanceByUserIdApi,
  handleRechargePaymentApi,
  handleTransactionHistoryApi,
} from "../../../axios/UserService";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const UserWallet = () => {
  const navigate = useNavigate();
  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : navigate("/");
  const [userBalance, setUserBalance] = useState(0);
  const [userBalanceHistory, setUserBalanceHistory] = useState([]);
  const [amountTopUp, setAmountTopUp] = useState(0);
  const [topUpReady, setTopUpReady] = useState(false);
  const inputRef = useRef(null);

  const getInfo = async () => {
    // console.log(user.UserID);
    const res = await handleBalanceByUserIdApi(user?.UserID);
    // console.log(res.data);
    setUserBalance(res.data);
    const token = Cookies.get("token");
    const resTransaction = await handleTransactionHistoryApi(token);
    console.log(resTransaction.data.$values);
    setUserBalanceHistory(resTransaction.data.$values);
  };

  //format to display
  const formatMoney = (value) => {
    // Ensure the value is a number or a string
    let [integerPart, decimalPart] = String(value).split(".");
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted number with the decimal part (if present)
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };
  //----handle amount input------
  const handleInputChange = (e) => {
    const inputValue = Number(e.target.value);
    // Check if the input value is divisible by 1000
    if (inputValue % 10000 === 0 && inputValue > 0) {
      setAmountTopUp(inputValue);
      setTopUpReady(true);
    } else {
      setTopUpReady(false);
    }
  };
  //----top up------
  const handleTopUp = async () => {
    // console.log(amountTopUp);
    if (amountTopUp > 0 && amountTopUp < 20000001) {
      // console.log("Nap tien ", amountTopUp);
      const token = Cookies.get("token");
      const resLink = await handleRechargePaymentApi(token, amountTopUp);
      sessionStorage.setItem("amount", amountTopUp);
      // console.log(resLink.data);
      window.location.href = resLink.data;
    } else {
      toast.error("Amount only validate between 10,000VND and 20,000,000VND", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  //-----auto update amount fill-------
  const handlePackageClick = (value) => {
    setAmountTopUp(value);
    if (inputRef.current) {
      inputRef.current.value = value; // Update the input value
    }
    setTopUpReady(true);
  };
  //;\-----------
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="wallet-cont">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="user-wallet-content">
        <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
        <div className="user-wallet-content-row1">
          <div className="user-wallet-content-row1-col1">
            <div className="total-balance">
              <div className="total-balance-text">Total Balance VND</div>
              <div className="total-balance-number">
                {userBalance ? formatMoney(userBalance) : "0"} vnd
              </div>
            </div>
            <div className="total-balance-input-parent">
              <div className="total-balance-input-parent-icon">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <input
                className="total-balance-input"
                type="number"
                ref={inputRef} // Attach ref to the input
                onChange={handleInputChange}
                min={0}
                max={20000000}
              />
              <div className="vnd">VND</div>
            </div>
            <div className="notice-input">
              <div className="notice-input-text">
                Please enter amount in multiples of 10000
              </div>
            </div>

            <button
              className={topUpReady ? "top-up-btn" : "top-up-btn-off"}
              onClick={handleTopUp}
              disabled={!topUpReady}
            >
              Top Up
            </button>
          </div>
          <div className="user-wallet-content-row1-col2">
            <div className="recharge-package">
              <div
                className="package1"
                onClick={() => handlePackageClick(1000000)}
              >
                1,000,000 VND
              </div>
              <div
                className="package2"
                onClick={() => handlePackageClick(5000000)}
              >
                5,000,000 VND
              </div>
            </div>
            <div className="recharge-package">
              <div
                className="package3"
                onClick={() => handlePackageClick(10000000)}
              >
                10,000,000 VND
              </div>
              <div
                className="package4"
                onClick={() => handlePackageClick(15000000)}
              >
                15,000,000 VND
              </div>
            </div>
          </div>
        </div>
        <div className="user-wallet-content-row2">
          <table className="table-transaction-history">
            <thead>
              <tr>
                <th>No</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Transaction Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {userBalanceHistory && userBalanceHistory.length > 0 ? (
                userBalanceHistory.map((transaction, index) => {
                  return (
                    <tr key={transaction.transactionId}>
                      <td>{index + 1}</td>
                      <td>{transaction.transactionId}</td>
                      <td>
                        {transaction.amount < 0
                          ? "-" + formatMoney(transaction.amount) + " VND"
                          : "+" + formatMoney(transaction.amount) + " VND"}
                      </td>
                      <td>
                        {new Date(transaction.updateDate).toLocaleString()}
                      </td>
                      <td>{transaction.description}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No transaction history</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer">
        <div className="logo-footer">
          <img className="logo-img-footer" src={logo} alt="" />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src="../../assets/images/Instagram.svg" alt="" />
          </div>
          <div className="facebook">
            <img src="../../assets/images/Social Icons (1).svg" alt="" />
          </div>
          <div className="google">
            <img src="../../assets/images/Vector.svg" alt="" />
          </div>
        </div>
        <div className="nav-bar-footer">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
      </footer>
    </div>
  );
};

export default UserWallet;

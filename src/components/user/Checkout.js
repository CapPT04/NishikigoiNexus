import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import {
  handleGetPaymentPriceApi,
  handleWinnerPaymentApi,
} from "../../axios/UserService";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";

const Checkout = () => {
  // Step 1: Create state variables to store input values
  const [winningPrice, setWinningPrice] = useState("");
  const [depositPrice, setDepositPrice] = useState("");
  const [paymentDue, setPaymentDue] = useState("");
  const location = useLocation();
  const fishEntryId = location?.state;
  const isCheckoutDisabled = !winningPrice || !depositPrice || !paymentDue;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetPaymentPrice = async () => {
      const response = await handleGetPaymentPriceApi(fishEntryId);
      // console.log("payment: ", response);

      if (response && response.status === 200) {
        setDepositPrice(response.data.deposit);
        setWinningPrice(response.data.soldPrice);
        setPaymentDue(response.data.finalPrice);
      }
    };
    fetchGetPaymentPrice();
  }, [fishEntryId]);

  const handleCheckout = async () => {
    const result = await Swal.fire({
      title: "Confirm Checkout",
      text: "Are you sure you want to proceed with the checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      // Show loading indicator
      Swal.fire({
        title: "Processing Checkout...",
        text: "Please wait while we process your order.",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await handleWinnerPaymentApi(
          Cookies.get("token"),
          fishEntryId
        );
        // console.log("response: ", response);

        if (response && response.status === 200) {
          // Success notification
          Swal.fire({
            icon: "success",
            title: "Checkout Successful!",
            text: "Your checkout has been completed successfully.",
          }).then(() => {
            navigate("/user/UserBidHistory");
          });
        } else if (response && response.status === 400) {
          // Insufficient balance error
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: "You do not have enough balance to complete the checkout. Please deposit money into your account.",
            showCancelButton: true,
            confirmButtonText: "Go to Deposit Page",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/user/UserWallet");
            }
          });
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: "An error occurred during checkout. Please try again later.",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Checkout Canceled",
        text: "You chose not to proceed with the checkout.",
      });
    }
  };

  const formatMoney = (value) => {
    // Convert the value to a string and take only the integer part
    let integerPart = String(Math.floor(Number(value)));
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted integer part
    return integerPart;
  };
  return (
    <div className="checkout-page">
      <div className="checkout-background">
        <div className="checkout-content">
          {/* <div className="winning-price">
                        <label htmlFor="winning-price-input" className="winning-price-label">Winning Price</label>
                        <div
                            className="winning-price-input"
                            id="winning-price-input">
                            {formatMoney(winningPrice)}
                        </div>
                    </div>
                    <div className="deposit-price">
                        <label htmlFor="deposit-price-input" className="deposit-price-label">Deposit Price</label>
                        <div
                            className="deposit-price-input"
                            id="deposit-price-input">
                            {formatMoney(depositPrice)}
                        </div>
                    </div> */}
          {/* <div className="deposit-price">
                        <label htmlFor="deposit-price-input" className="deposit-price-label">Deposit Price</label>
                        <div
                            className="deposit-price-input"
                            id="deposit-price-input">
                            {formatMoney(depositPrice)}
                        </div>
                    </div>  */}
          {/* <div className="payment-due">
                        <div className="payment-due-input">
                            {formatMoney(paymentDue)}
                        </div>
                    </div> */}
          <div className="winning-notification">
            <h2>Congratulations!</h2>
            <p>You have won the auction!</p>
            <p className="payment-amount">
              The amount due for payment is:{" "}
              <strong>{formatMoney(paymentDue)}</strong>
            </p>
            <p>Please proceed with the payment to complete your purchase.</p>
          </div>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isCheckoutDisabled}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

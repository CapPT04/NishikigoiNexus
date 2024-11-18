<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { handleGetPaymentPriceApi, handleWinnerPaymentApi } from "../../axios/UserService";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Checkout = () => {
    // Step 1: Create state variables to store input values
    const [winningPrice, setWinningPrice] = useState('');
    const [depositPrice, setDepositPrice] = useState('');
    const [paymentDue, setPaymentDue] = useState('');
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
        }
        fetchGetPaymentPrice();
    }, [fishEntryId])

    const handleCheckout = async () => {
        const result = await Swal.fire({
            title: 'Confirm Checkout',
            text: 'Are you sure you want to proceed with the checkout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed',
            cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {
            // Show loading indicator
            Swal.fire({
                title: 'Processing Checkout...',
                text: 'Please wait while we process your order.',
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                const response = await handleWinnerPaymentApi(sessionStorage.getItem("token"), fishEntryId);
                // console.log("response: ", response);

                if (response && response.status === 200) {
                    // Success notification
                    Swal.fire({
                        icon: 'success',
                        title: 'Checkout Successful!',
                        text: 'Your checkout has been completed successfully.'
                    }).then(() => {
                        navigate("/user/UserBidHistory");
                    });
                } else if (response && response.status === 400) {
                    // Insufficient balance error
                    Swal.fire({
                        icon: 'error',
                        title: 'Checkout Failed',
                        text: 'You do not have enough balance to complete the checkout. Please deposit money into your account.',
                        showCancelButton: true,
                        confirmButtonText: 'Go to Deposit Page',
                        cancelButtonText: 'Cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/user/UserWallet");
                        }
                    });
                }
            } catch (error) {
                console.error('Error during checkout:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Checkout Failed',
                    text: 'An error occurred during checkout. Please try again later.'
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Checkout Canceled',
                text: 'You chose not to proceed with the checkout.'
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
                            The amount due for payment is: <strong>{formatMoney(paymentDue)}</strong>
                        </p>
                        <p>Please proceed with the payment to complete your purchase.</p>
                    </div>
                    <button className="checkout-btn" onClick={handleCheckout}
                        disabled={isCheckoutDisabled}
                    >
                        Checkout
                    </button>
                </div>
            </div>
=======
import React, { useState } from 'react';
import './Checkout.scss';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure useNavigate is from 'react-router-dom'
import { handleWinnerPaymentApi } from "../../axios/UserService";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Checkout = () => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const isCheckoutDisabled = !phone || !city || !address;
  const location = useLocation();
  const navigate = useNavigate();
  const fishEntryId = location.state?.fishEntryId || null;
  const soldPrice = location.state?.highestPrice || null;



=======
import React, { useState } from 'react';
import './Checkout.scss';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure useNavigate is from 'react-router-dom'
import { handleWinnerPaymentApi } from "../../axios/UserService";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Checkout = () => {
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const isCheckoutDisabled = !phone || !city || !address;
  const location = useLocation();
  const navigate = useNavigate();
  const fishEntryId = location.state?.fishEntryId || null;
  const soldPrice = location.state?.highestPrice || null;



>>>>>>> Stashed changes
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

  const handleCancelBtn = () => {
    navigate("/User/UserBidHistory");
  };

  const handleCheckoutBtn = async () => {
    const checkoutData = {
      phone: phone,
      city: city,
      address: address,
    };

    const result = await Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      // Show loading indicator
      Swal.fire({
        title: 'Processing Checkout...',
        text: 'Please wait while we process your order.',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await handleWinnerPaymentApi(Cookies.get("token"), parseInt(fishEntryId, 10), checkoutData);
        if (response && response.status === 200) {
          // Success notification
          Swal.fire({
            icon: 'success',
            title: '<h2 style="color: #4caf50; font-family: Arial, sans-serif; font-weight: bold; font-size: 24px; margin-bottom: 10px;">🎉 Congratulations! 🎉</h2>',
            html: `
              <div style="
                font-family: 'Verdana', sans-serif;
                font-size: 16px;
                color: #333333;
                line-height: 1.6;
                text-align: center;
              ">
                <p style="margin-bottom: 15px;">
                  <strong style="color: #2e7d32;">You have successfully won the auction!</strong>
                </p>
                <p style="margin-bottom: 20px;">
                  Your payment has been processed successfully. The item will be delivered to your provided address soon.
                </p>
                <div style="display: flex; justify-content: center; align-items: center; margin: 15px 0;">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                    alt="Winner" 
                    style="width: 120px; height: 120px; border-radius: 50%; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);"
                  />
                </div>
                <p style="font-size: 14px; color: #757575;">Thank you for your trust in us!</p>
              </div>
            `,
            confirmButtonText: `
              <span style="
                font-size: 16px;
                font-weight: bold;
                color: white;
                background-color: #4caf50;
                padding: 10px 20px;
                border-radius: 5px;
                box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
                cursor: pointer;
              ">
                View My Auction History
              </span>
            `,
            customClass: {
              popup: 'styled-swal-popup',
            },
          }).then(() => {
            navigate("/user/UserBidHistory");
          });
        } else if (response && response.status === 400) {
          // Insufficient balance error
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: 'You do not have enough balance to complete the checkout. Please deposit money into your account.',
            showCancelButton: true,
            confirmButtonText: 'Go to Deposit Page',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/user/UserWallet");
            }
          });
        }
      } catch (error) {
        console.error('Error during checkout:', error);
        Swal.fire({
          icon: 'error',
          title: 'Checkout Failed',
          text: 'An error occurred during checkout. Please try again later.',
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Checkout Canceled',
        text: 'You chose not to proceed with the checkout.',
      });
    }
  };


  return (
    <div className="checkout-page">
      <div className="checkout-background">
        <div className="checkout-content">
          <div className="phone">
            <label htmlFor="phone-input" className="phone-label">Phone</label>
            <input
              type="text"
              className="phone-input"
              id="phone-input"
              value={phone} // Bind state to input
              onChange={(e) => setPhone(e.target.value)} // Handle input change
            />
<<<<<<< Updated upstream
          </div>
          <div className="city">
            <label htmlFor="city-input" className="city-label">City</label>
            <input
              type="text"
              className="city-input"
              id="city-input"
              value={city} // Bind state to input
              onChange={(e) => setCity(e.target.value)} // Handle input change
            />
          </div>
          <div className="address">
            <label htmlFor="address-input" className="address-label">Address</label>
            <input
              type="text"
              className="address-input"
              id="address-input"
              value={address} // Bind state to input
              onChange={(e) => setAddress(e.target.value)} // Handle input change
            />
          </div>
          <div className="sold-price">
            <label htmlFor="sold-price-input" className="sold-price-label">Due Payment</label>
            <input
              type="text"
              className="sold-price-input"
              value={formatMoney(soldPrice) + " VND"}
            />
          </div>
          <div className='btn-for-checkout-page'>
            <button
              className="checkout-btn"
              onClick={handleCheckoutBtn}
              disabled={isCheckoutDisabled}
            >
              Checkout
            </button>
            <button
              className="checkout-cancel-btn"
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
>>>>>>> Stashed changes
=======
          </div>
          <div className="city">
            <label htmlFor="city-input" className="city-label">City</label>
            <input
              type="text"
              className="city-input"
              id="city-input"
              value={city} // Bind state to input
              onChange={(e) => setCity(e.target.value)} // Handle input change
            />
          </div>
          <div className="address">
            <label htmlFor="address-input" className="address-label">Address</label>
            <input
              type="text"
              className="address-input"
              id="address-input"
              value={address} // Bind state to input
              onChange={(e) => setAddress(e.target.value)} // Handle input change
            />
          </div>
          <div className="sold-price">
            <label htmlFor="sold-price-input" className="sold-price-label">Due Payment</label>
            <input
              type="text"
              className="sold-price-input"
              value={formatMoney(soldPrice) + " VND"}
            />
          </div>
          <div className='btn-for-checkout-page'>
            <button
              className="checkout-btn"
              onClick={handleCheckoutBtn}
              disabled={isCheckoutDisabled}
            >
              Checkout
            </button>
            <button
              className="checkout-cancel-btn"
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
>>>>>>> Stashed changes
        </div>
    );
};

export default Checkout;

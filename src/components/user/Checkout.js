import React, { useState } from 'react';
import './Checkout.scss';
import { useLocation } from 'react-router';
import { handleWinnerPaymentApi } from "../../axios/UserService";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
const Checkout = () => {
  // Step 1: Create state variables to store input values
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const location = useLocation();
  const fishEntryId = location.state?.fishEntryId || null;
  const highestPrice = location.state?.highestPrice || null;
  const navigate = useNavigate();
  const isDisableCheckoutBtn = !phone || !city || !address;

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
          Swal.fire({
            icon: 'success',
            title: '🎉 Congratulations! 🎉',
            html: `
              <div style="text-align: left;">
                <p><strong>You have successfully won the auction!</strong></p>
                <p>Your payment has been processed successfully. The item will be delivered to your provided address soon.</p>
              </div>
            `,
            confirmButtonText: 'View My Auction History',
          }).then(() => {
            navigate("/user/UserBidHistory");
          });
        } else if (response && response.status === 400) {
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

  const handleCancelBtn = async () => {
    navigate("UserBidHistory")
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
              value={formatMoney(highestPrice)}
            />
          </div>
          <div className='btn-for-checkout-page'>
            <button className="checkout-btn" onClick={() => handleCheckoutBtn()} disabled={isDisableCheckoutBtn}>
              Checkout
            </button>
            <button className="checkout-cancel-btn" onClick={() => handleCancelBtn()}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;

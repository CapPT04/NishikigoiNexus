import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { useLocation } from 'react-router';
import { handleGetPaymentPriceApi, handleWinnerPaymentApi } from "../../axios/UserService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const Checkout = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const location = useLocation();
  const fishEntryId = location.state?.fishEntryId || null;
  const [duePayment, setDuePayment] = useState(0);
  const navigate = useNavigate();
  const isDisableCheckoutBtn = !name || !phone || !city || !address;

  const formatMoney = (value) => {
    let integerPart = String(Math.floor(Number(value)));
    integerPart = integerPart.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return integerPart;
  };


  useEffect(() => {
    const fetchDuePayment = async () => {
      try {

        const response = await handleGetPaymentPriceApi(fishEntryId);
        console.log(response);

        if (response && response.status === 200) {
          setDuePayment(response.data.finalPrice || 0);
        }
      }
      catch (error) {
        console.log("Error in fetchDuePayment in Checkout");
      }
    }
    fetchDuePayment();
  }, [])

  const handleCheckoutBtn = async () => {
    const checkoutData = { name, phone, city, address };

    const result = await Swal.fire({
      title: 'Confirm Checkout',
      text: 'Are you sure you want to proceed with the checkout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Processing Checkout...',
        text: 'Please wait while we process your order.',
        didOpen: () => Swal.showLoading(),
      });

      try {
        const response = await handleWinnerPaymentApi(Cookies.get("token"), parseInt(fishEntryId, 10), checkoutData);

        if (response && response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '🎉 Congratulations! 🎉',
            text: 'Your payment has been processed successfully. The item will be delivered to your provided address soon.',
            confirmButtonText: 'View My Auction History',
          }).then(() => navigate("/user/UserBidHistory"));
        } else if (response && response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: 'You do not have enough balance to complete the checkout. Please deposit money into your account.',
            showCancelButton: true,
            confirmButtonText: 'Go to Deposit Page',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) navigate("/user/UserWallet");
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

  const handleCancelBtn = () => navigate("/user/UserBidHistory");

  return (
    <div className="checkout-page">
      <div className="checkout-background">
        <div className="checkout-content">
          <div className="congratulatory-message">
            <h2 className="congratulatory-text">🎉 Congratulations! 🎉</h2>
            <p className="payment-info">
              You have won the auction. The amount to be paid after deducting the deposit is:
              <strong> {formatMoney(duePayment)} VND</strong>.
              Please provide your delivery details below to complete the checkout.
            </p>
          </div>
          <div className="name">
            <label htmlFor="name-input" className="name-label">Name</label>
            <input
              type="text"
              className="name-input"
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="phone">
            <label htmlFor="phone-input" className="phone-label">Phone</label>
            <input
              type="text"
              className="phone-input"
              id="phone-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="city">
            <label htmlFor="city-input" className="city-label">City</label>
            <input
              type="text"
              className="city-input"
              id="city-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="address">
            <label htmlFor="address-input" className="address-label">Address</label>
            <input
              type="text"
              className="address-input"
              id="address-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="btn-for-checkout-page">
            <button className="checkout-btn" onClick={handleCheckoutBtn} disabled={isDisableCheckoutBtn}>
              Checkout
            </button>
            <button className="checkout-cancel-btn" onClick={handleCancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

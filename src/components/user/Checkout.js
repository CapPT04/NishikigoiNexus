import React, { useState } from 'react';
import './Checkout.scss';
import { handleWinnerPaymentApi } from "../../axios/UserService";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Checkout = () => {
    // Step 1: Create state variables to store input values
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const location = useLocation();
    const fishEntryId = location.state; // Access fishEntryId safely
    const isCheckoutDisabled = !phone || !city || !address;
    const navigate = useNavigate();



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
                const checkoutData = { phone, city, address };
                sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));

                const response = await handleWinnerPaymentApi(checkoutData, sessionStorage.getItem("token"), fishEntryId);

                if (response && response.status === 200) {
                    // Success notification
                    Swal.fire({
                        icon: 'success',
                        title: 'Checkout Successful!',
                        text: 'Your checkout has been completed successfully.'
                    }).then(() => {
                        // Redirect or perform further actions on success
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
                            // Redirect to the deposit page based on user role
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
                    <button className="checkout-btn" onClick={handleCheckout}
                        disabled={isCheckoutDisabled} // Disable button if any field is empty
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

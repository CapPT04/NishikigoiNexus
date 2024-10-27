import React, { useState } from 'react';
import './Checkout.scss';
import { useLocation } from 'react-router';
import { handleWinnerPaymentApi } from "../../axios/UserService";

const Checkout = () => {
    // Step 1: Create state variables to store input values
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const location = useLocation();
    const fishEntryId = location.state; // Access fishEntryId safely



    const handleCheckout = async () => {
        const checkoutData = {
            phone,
            city,
            address,
        };

        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        try {
            const response = await handleWinnerPaymentApi(sessionStorage.getItem("token"), fishEntryId);
            if (response && response.status === 200) {
                window.location.href = response.data;
            }
            console.log('Payment API response:', response);
            // Optionally handle success (e.g., navigate or show a success message)
        } catch (error) {
            console.error('Error calling payment API:', error);
            // Optionally handle the error (e.g., show an alert or message to the user)
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
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import React, { useEffect, useState } from "react";
import "./DeliveryDetail.scss";
import Navbar from "../../components/common/Navbar/Navbar";
import VerticallyNavbar from "../.././components/common/Navbar/VerticallyNavbar";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { handleGetPaymentAndDeliveryApi } from "../../axios/UserService";
const DeliveryDetail = () => {

    const location = useLocation();
    const fishEntryId = location?.state;
    const [delivery, setDelivery] = useState({});

    useEffect(() => {
        const fetchGetPaymentAndDelivery = async () => {
            const response = await handleGetPaymentAndDeliveryApi(fishEntryId);
            if (response && response.status === 200) {
                setDelivery(response.data);
            } else {
                console.log("Error in handleGetPaymentAndDeliveryApi at DeliveryDetail.js");
            }
        }
        fetchGetPaymentAndDelivery();
    }, [])


    return (
        <div className="delivery-detail-container">
            <div className="header">
                <Navbar></Navbar>
            </div>
            <div className="delivery-detail-background">
                <ToastContainer />
                <div className="deliver-detail-title">Delivery details</div>
                <div className="deliver-detail-status">
                    Status: &nbsp;
                    {delivery?.deliveryStatus === 1 ? (<span>Waiting</span>) : ""}
                    {delivery?.deliveryStatus === 2 ? (<span>Delivering</span>) : ""}
                    {delivery?.deliveryStatus === 3 ? (<span>Complete</span>) : ""}
                    {delivery?.deliveryStatus === 4 ? (<span>Cancel</span>) : ""}
                </div>
                <div className="start-date-and-complete-date">
                    <div className="delivery-detail-start-date">
                        <label for="start-date-content" className="start-date-label" >
                            Start Date
                        </label>

                        <div className="start-date-content">
                            {new Date(delivery?.startDate).toLocaleString()}

                        </div>
                    </div>
                    <div className="delivery-detail-complete-date">
                        <label for="complete-date-content" className="complete-date-label">Complete Date</label>
                        <div className="complete-date-content">
                            {delivery?.endDate ? (new Date(delivery?.endDate).toLocaleString()) : "Not Complete"}
                        </div>
                    </div>
                </div>
                <div className="delivery-id-and-delivery-phone">
                    <div className="delivery-id">
                        <label for="delivery-id-content" className="delivery-id-label" >Deliery ID</label>
                        <div className="delivery-id-content">
                            {delivery?.deliveryId}
                        </div>
                    </div>
                    <div className="delivery-phone">
                        <label for="delivery-phone-content" className="delivery-phone-label" >Phone</label>
                        <div className="delivery-phone-content">
                            {delivery?.phone}
                        </div>
                    </div>
                </div>
                <div className="delivery-city-and-address">
                    <div className="delivery-city">
                        <label for="delivery-city-content" className="delivery-city-label" >
                            City
                        </label>

                        <div className="delivery-city-content">
                            {delivery?.city}
                        </div>
                    </div>
                    <div className="delivery-address">
                        <label for="delivery-address-content" className="delivery-address-label" >
                            Address
                        </label>
                        <div className="delivery-address-content">
                            {delivery?.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetail;

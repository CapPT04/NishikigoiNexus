import React, { useEffect, useState } from "react";
import "./AuctionDetail.scss";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { useLocation } from "react-router";
import { handleGetFishEntryInAuction } from "../../axios/UserService";

const AuctionDetail = () => {
    const location = useLocation();
    const auction = location.state || {}; // Default to empty object
    const [fishEntryInAuction, setFishEntryInAuction] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                console.log("Location Object:", location);
                console.log("Auction Data:", auction);
                const response = await handleGetFishEntryInAuction(parseInt(auction.auctionId, 10));
                setFishEntryInAuction(response.data.$values || []); // Handle the case where $values might be undefined
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        fetchAuctions();
    }, [location, auction]);

    return (
        <div className="auction-detail-container">
            <div className="header">
                <div className="navigation-bar">
                    <div className="navigation-bar-left-content">
                        <img className="logo" src="../../assets/images/logo_png.png" alt="" />
                        <div className="project-name">Nishikigoi Nexus</div>
                    </div>

                    <div className="navigation-bar-right-content">
                        <a className="staff">STAFF</a>
                        <a className="home">HOME</a>
                        <a className="auction">AUCTION</a>
                        <a className="blog">BLOG</a>
                        <a className="about">ABOUT</a>
                        <a className="account">ACCOUNT</a>
                    </div>
                </div>
            </div>

            <div className="body-content-auction-detail">
                <VerticallyNavbar />

                <div className="body-content-right-auction-detail">
                    <div className="auction-detail-content">
                        <div className="auction-detail-content-row1">
                            <div className="status">Status: &nbsp;
                                {auction.status === 1 && 'Preparing'}
                                {auction.status === 2 && 'Waiting'}
                                {auction.status === 3 && 'Bidding'}
                                {auction.status === 4 && 'Ended'}
                            </div>
                            <select name="" id="" className="set-status">
                                <option value="">Preparing &nbsp;&nbsp;</option>
                                <option value="">Waiting &nbsp;&nbsp; </option>
                                <option value="">Bidding &nbsp;&nbsp; </option>
                                <option value="">Ended &nbsp;&nbsp; </option>
                            </select>
                        </div>

                        <div className="auction-detail-content-row2">Auction Detail</div>

                        <div className="auction-detail-content-row4">
                            <label htmlFor="start-date-input" className="start-date-label">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                className="start-date-input"
                                value={auction?.startDate || "YYYY-MM-DDTHH:MM"}
                                readOnly // Assuming this is a read-only field; remove if editable
                            />
                        </div>

                        <div className="auction-detail-content-row5">
                            <div className="add-fish">
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>

                        <div className="auction-detail-content-row6">
                            <table className="table-manage-auction">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Fish Entry</th>
                                        <th>Start Time</th>
                                        <th>Finish Time</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fishEntryInAuction.length > 0 ? (
                                        fishEntryInAuction.map((fishEntry, index) => (
                                            <tr key={fishEntry.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{fishEntry.fishEntryId || "Unknown Fish"}</td>
                                                <td>
                                                    <input
                                                        type="datetime-local"
                                                        className="start-time-input"
                                                        defaultValue={fishEntry.startDate}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="datetime-local"
                                                        className="finish-time-input"
                                                        defaultValue={fishEntry.endDate}
                                                    />
                                                </td>
                                                <td>
                                                    {fishEntry.status === 1 && 'Preparing'}
                                                    {fishEntry.status === 2 && 'Waiting'}
                                                    {fishEntry.status === 3 && 'Bidding'}
                                                    {fishEntry.status === 4 && 'Ended'}</td>
                                                <td>
                                                    <button className="update-btn">Update</button>
                                                </td>
                                                <td>
                                                    <i className="fa-solid fa-trash"></i>
                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="7">No FishEntry available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionDetail;

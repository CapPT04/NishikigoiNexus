import React, { useEffect, useState } from "react";
import "./AuctionDetail.scss";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { useLocation } from "react-router";
import { handleAddFishEntryForAuctionApi, handleDeleteFishEntryInAuctionApi, handleGetFishEntryForAuctionApi, handleGetFishEntryInAuction } from "../../axios/UserService";
import logo from "../../assets/images/logo_png.png";
import { handleUpdateAuctionDetailApi } from "../../axios/UserService"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuctionDetail = () => {
    const location = useLocation();
    const auction = location.state || {}; // Default to empty object
    const [fishEntryInAuction, setFishEntryInAuction] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [finishTime, setFinishTime] = useState("");
    console.log(startTime);
    console.log(finishTime);
    const [fishEntryForAuction, setFishEntryForAuction] = useState("");
    const [showFishEntryTable, setShowFishEntryTable] = useState(false);




    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                console.log("Location Object:", location);
                console.log("Auction Data:", auction);
                const response = await handleGetFishEntryInAuction(parseInt(auction.auctionId, 10));
                setFishEntryInAuction(response.data.$values || []);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        fetchAuctions();
    }, [location, auction]);

    const handleUpdateBtn = async (fishEntry) => {
        try {
            const updatedStartTime = startTime || fishEntry.startDate;
            const updatedFinishTime = finishTime || fishEntry.endDate;
            const response = await handleUpdateAuctionDetailApi(fishEntry.fishEntryId, updatedStartTime, updatedFinishTime);
            console.log(response);

            if (response && response.status === 200) {
                toast.success("Auction updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Failed to update auction. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("Error updating auction:", error);
            toast.error("An error occurred while updating. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleDeleteFishEntryInAuction = async (fishEntry) => {
        try {
            const response = await handleDeleteFishEntryInAuctionApi(auction.auctionId, fishEntry.fishEntryId);
            const updatedAuctionEntriesResponse = await handleGetFishEntryInAuction(parseInt(auction.auctionId, 10));
            setFishEntryInAuction(updatedAuctionEntriesResponse.data.$values || []);
            const availableFishEntriesResponse = await handleGetFishEntryForAuctionApi();
            setFishEntryForAuction(availableFishEntriesResponse.data.$values || []);
        } catch (error) {
            throw error;
        }
    }

    const handleAddFishBtn = async () => {
        try {
            const response = await handleGetFishEntryForAuctionApi();
            console.log(response);
            setFishEntryForAuction(response.data.$values);
            setShowFishEntryTable(true);



        } catch (error) {
            throw error;
        }
    }
    const handleAddFishEntryToAuction = async (fishEntry) => {
        try {
            const response = await handleAddFishEntryForAuctionApi(fishEntry.fishEntryId, auction.auctionId, sessionStorage.getItem("token"));
            console.log(response);

            if (response && response.status === 200) {
                // Fetch updated fish entries in auction after successful addition
                const updatedAuctionEntriesResponse = await handleGetFishEntryInAuction(parseInt(auction.auctionId, 10));
                setFishEntryInAuction(updatedAuctionEntriesResponse.data.$values || []); // Update state for auction entries

                // Fetch available fish entries for auction
                const availableFishEntriesResponse = await handleGetFishEntryForAuctionApi();
                setFishEntryForAuction(availableFishEntriesResponse.data.$values || []); // Update state for available fish entries

                toast.success("Fish entry added to auction successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Failed to add fish entry. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("Error adding fish entry:", error);
            toast.error("An error occurred while adding the fish entry. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };




    return (
        <div className="auction-detail-container">
            <ToastContainer />
            <div className="header">
                <div className="navigation-bar">
                    <div className="navigation-bar-left-content">
                        <img className="logo" src={logo} alt="" />
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
                                <i
                                    className="fa-solid fa-plus"
                                    onClick={() => handleAddFishBtn()}
                                ></i>

                            </div>
                        </div>
                        {showFishEntryTable && (
                            <div className="auction-detail-content-row7">
                                <table className="table-added-fish-entry">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>FishEntry ID</th>
                                            <th>Expected Date</th>
                                            <th>Method</th>
                                            <th>Add</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fishEntryForAuction.length > 0 ? (
                                            fishEntryForAuction.map((fishEntry, index) => (
                                                <tr key={fishEntry.fishEntryId || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{fishEntry.fishEntryId || "Unknown Fish"}</td>
                                                    <td>{fishEntry.expectedDate || "N/A"}</td>
                                                    <td>
                                                        {fishEntry.auctionMethod === 1 && 'FixedPriceSale'}
                                                        {fishEntry.auctionMethod === 2 && "SecretBid"}
                                                        {fishEntry.auctionMethod === 3 && "PublicBid"}
                                                        {fishEntry.auctionMethod === 4 && "DutchAuction"}
                                                    </td>

                                                    <td>
                                                        <i class="fa-solid fa-plus"
                                                            onClick={() => handleAddFishEntryToAuction(fishEntry)}
                                                        ></i>

                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No FishEntry available</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        )}

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
                                                        onChange={(even) => setStartTime(even.target.value)}
                                                        defaultValue={fishEntry.startDate}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="datetime-local"
                                                        className="finish-time-input"
                                                        onChange={(even) => setFinishTime(even.target.value)}
                                                        defaultValue={fishEntry.endDate}
                                                    />
                                                </td>
                                                <td>
                                                    {fishEntry.status === 1 && 'Preparing'}
                                                    {fishEntry.status === 2 && 'Waiting'}
                                                    {fishEntry.status === 3 && 'Bidding'}
                                                    {fishEntry.status === 4 && 'Ended'}</td>
                                                <td>
                                                    <button
                                                        className="update-btn"
                                                        onClick={() => handleUpdateBtn(fishEntry)}
                                                    >Update</button>
                                                </td>
                                                <td>
                                                    <i

                                                        className="fa-solid fa-trash delete-icon"
                                                        onClick={() => handleDeleteFishEntryInAuction(fishEntry)}
                                                    ></i>
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

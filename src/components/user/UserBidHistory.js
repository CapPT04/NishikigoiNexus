import React, { useState, useEffect } from 'react';
import './UserBidHistory.scss';
import Navbar from '../common/Navbar/Navbar';
import { handleGetBiddingHistoryByMemberIdApi, handleGetUnpaidBiddingHistoryByMemberIdApi } from "../../axios/UserService";
import { Navigate, useNavigate } from 'react-router';


const UserBidHistory = () => {
    const [biddingHistory, setBiddingHistory] = useState([]);
    const [unpaidBiddingHistory, setUnpaidBiddingHistory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBiddingHistoryByMemberId = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("user"));
                const response = await handleGetBiddingHistoryByMemberIdApi(user.UserID);

                setBiddingHistory(response.data.$values || []);
            } catch (error) {
                console.error("Error fetching bidding history:", error);
            }
        };
        fetchBiddingHistoryByMemberId();
    }, []);

    useEffect(() => {
        const fetchUnpaidBiddingHistoryByMemberId = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("user"));
                const response = await handleGetUnpaidBiddingHistoryByMemberIdApi(user.UserID);
                console.log(response);

                setUnpaidBiddingHistory(response.data.$values || []);
            } catch (error) {
                console.error("Error fetching unpaid bidding history:", error);
            }
        };
        fetchUnpaidBiddingHistoryByMemberId();
    }, []);

    return (
        <div className="user-bid-history">
            <div className="header">
                <Navbar />
            </div>

            <div className="user-bid-history-content">
                <div className="table-unpaid-auction">
                    <div className="table-unpaid-auction-name">Unpaid Auction</div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Auction ID</th>
                                <th>Fish Entry ID</th>
                                <th>Auction Date</th>
                                <th>Sold Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {unpaidBiddingHistory.length > 0 ? (
                                unpaidBiddingHistory.map((auction, index) => (
                                    <tr key={auction.auctionId}>
                                        <td>{index + 1}</td>
                                        <td>{auction.auctionId}</td>
                                        <td>{auction.fishEntryId}</td>
                                        <td>{new Date(auction.startDate).toLocaleString()}</td>
                                        <td>{auction.highestPrice}</td>
                                        <td>
                                            <button
                                                className="pay-auction-btn"
                                                onClick={() => navigate("/User/Checkout", {
                                                    state: auction.fishEntryId
                                                })}
                                            >Pay Auction</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No unpaid auctions available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="table-auction-history">
                    <div className="table-auction-history-name">Auction History</div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Auction ID</th>
                                <th>Fish Entry ID</th>
                                <th>Auction Date</th>
                                <th>Winner</th>
                                <th>Sold Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {biddingHistory.length > 0 ? (
                                biddingHistory.map((bid, index) => (
                                    <tr key={bid.auctionId}>
                                        <td>{index + 1}</td>
                                        <td>{bid.auctionId}</td>
                                        <td>{bid.fishEntryId}</td>
                                        <td>{new Date(bid.startDate).toLocaleString()}</td>
                                        <td>
                                            {bid.isWinner ? (
                                                <span role="img" aria-label="win">🏆</span>
                                            ) : (
                                                <span role="img" aria-label="lose">❌</span>
                                            )}
                                        </td>
                                        <td>{bid.highestPrice}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No auction history available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserBidHistory;

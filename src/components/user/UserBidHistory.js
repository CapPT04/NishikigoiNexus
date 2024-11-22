import React, { useState, useEffect } from "react";
import "./UserBidHistory.scss";
import Navbar from "../common/Navbar/Navbar";
import {
  handleGetOtherBiddingHistoryByMemberIdApi,
  handleGetUnpaidBiddingHistoryByMemberIdApi,
} from "../../axios/UserService";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";

const UserBidHistory = () => {
  const [biddingHistory, setBiddingHistory] = useState([]);
  const [unpaidBiddingHistory, setUnpaidBiddingHistory] = useState([]);
  const [currentPageUnpaid, setCurrentPageUnpaid] = useState(0);
  const [currentPageHistory, setCurrentPageHistory] = useState(0);
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  // Fetch Unpaid Bidding History
  useEffect(() => {
    const fetchUnpaidBiddingHistoryByMemberId = async () => {
      try {
        const user = Cookies.get("user")
          ? JSON.parse(Cookies.get("user"))
          : null;
        const response = await handleGetUnpaidBiddingHistoryByMemberIdApi(
          user.UserID
        );
        setUnpaidBiddingHistory(response.data.$values || []);
      } catch (error) {
        console.error("Error fetching unpaid bidding history:", error);
      }
    };
    fetchUnpaidBiddingHistoryByMemberId();
  }, []);

  // Fetch Bidding History
  useEffect(() => {
    const fetchBiddingHistoryByMemberId = async () => {
      try {
        const user = Cookies.get("user")
          ? JSON.parse(Cookies.get("user"))
          : null;
        const response = await handleGetOtherBiddingHistoryByMemberIdApi(
          user.UserID
        );
        setBiddingHistory(response.data.$values || []);
      } catch (error) {
        console.error("Error fetching bidding history:", error);
      }
    };
    fetchBiddingHistoryByMemberId();
  }, []);

  // Pagination handling for unpaid auctions
  const offsetUnpaid = currentPageUnpaid * itemsPerPage;
  const currentUnpaidItems = unpaidBiddingHistory.slice(offsetUnpaid, offsetUnpaid + itemsPerPage);
  const pageCountUnpaid = Math.ceil(unpaidBiddingHistory.length / itemsPerPage);

  // Pagination handling for auction history
  const offsetHistory = currentPageHistory * itemsPerPage;
  const currentHistoryItems = biddingHistory.slice(offsetHistory, offsetHistory + itemsPerPage);
  const pageCountHistory = Math.ceil(biddingHistory.length / itemsPerPage);

  // Format money
  const formatMoney = (value) => {
    let integerPart = String(Math.floor(Number(value)));
    integerPart = integerPart.replace(/\D/g, "");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return integerPart;
  };

  // Handle page change for unpaid auctions
  const handlePageClickUnpaid = (event) => {
    setCurrentPageUnpaid(event.selected);
  };

  // Handle page change for auction history
  const handlePageClickHistory = (event) => {
    setCurrentPageHistory(event.selected);
  };

  return (
    <div className="user-bid-history">
      <div className="header">
        <Navbar />
      </div>

      <div className="user-bid-history-content">
        {/* Unpaid Auctions Table */}
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
              {currentUnpaidItems.length > 0 ? (
                currentUnpaidItems.map((auction, index) => (
                  <tr key={auction.auctionId}>
                    <td>{offsetUnpaid + index + 1}</td>
                    <td>{auction.auctionId}</td>
                    <td>{auction.fishEntryId}</td>
                    <td>{new Date(auction.startDate).toLocaleString()}</td>
                    <td>{formatMoney(auction.highestPrice)} VND</td>
                    <td>
                      <button
                        className="pay-auction-btn"
                        onClick={() =>
                          navigate("/User/Checkout", {
                            state: {
                              fishEntryId: auction.fishEntryId,
                              highestPrice: auction.highestPrice,
                            },
                          })
                        }
                      >
                        Pay Auction
                      </button>
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

          {/* Unpaid Auctions Pagination */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCountUnpaid}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClickUnpaid}
            containerClassName={"pagination-user-bid-history"}
            activeClassName={"active"}
          />
        </div>

        {/* Auction History Table */}
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
                <th>Tracking Delivery</th>
              </tr>
            </thead>
            <tbody>
              {currentHistoryItems.length > 0 ? (
                currentHistoryItems.map((bid, index) => (
                  <tr key={bid.auctionId}>
                    <td>{offsetHistory + index + 1}</td>
                    <td>{bid.auctionId}</td>
                    <td>{bid.fishEntryId}</td>
                    <td>{new Date(bid.startDate).toLocaleString()}</td>
                    <td>
                      {bid.isWinner ? (
                        <span role="img" aria-label="win">
                          🏆
                        </span>
                      ) : (
                        <span role="img" aria-label="lose">
                          ❌
                        </span>
                      )}
                    </td>
                    <td>{formatMoney(bid.highestPrice)} VND</td>
                    <td>
                      {bid.isWinner && (
                        <i
                          className="fa-solid fa-arrow-right"
                          onClick={() =>
                            navigate("/user/DeliveryDetail", {
                              state: bid.fishEntryId,
                            })
                          }
                        ></i>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No auction history available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Auction History Pagination */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCountHistory}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClickHistory}
            containerClassName={"pagination-user-bid-history"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBidHistory;

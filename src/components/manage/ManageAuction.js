import React, { useEffect, useState } from 'react';
import './ManageAuction.scss';
import logo from '../../assets/images/logo_png.png';
import searchIcon from '../../assets/images/search.svg';
import VerticallyNavbar from '../common/Navbar/VerticallyNavbar';
import { handleManageAuctionApi } from '../../axios/UserService';
import { useNavigate } from 'react-router-dom';

const ManageAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await handleManageAuctionApi();
        setAuctions(response.data.$values);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="manage-auction-container">
      <div className="header">
        <div className="navigation-bar">
          <div className="navigation-bar-left-content">
            <img className="logo" src={logo} alt="logo" />
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

      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="search-and-create">
            <div className="search">
              <div className="search-text">Search: </div>
              <div className="search-value">
                <input className="search-input" placeholder="Search by Email and Phone number" type="text" />
                <div className="search-icon">
                  <img src={searchIcon} alt="search-icon" />
                </div>
              </div>
            </div>
            <div className="create-btn" onClick={() => navigate("/Manager/CreateAuction")}>
              New Auction
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>

          <table className="table-manage-auction">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Start Date</th>
                <th>Number of fish</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {auctions.length > 0 ? (
                auctions.map((auction, index) => (
                  <tr key={auction.auctionId}>
                    <td>{index + 1}</td>
                    <td>{auction.auctionId}</td>
                    <td>{auction.startDate}</td>
                    <td>{auction.fishEntryCount}</td>
                    <td>
                      {auction.status === 1 && 'Preparing'}
                      {auction.status === 2 && 'Waiting'}
                      {auction.status === 3 && 'Bidding'}
                      {auction.status === 4 && 'Ended'}
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-arrow-right"
                        onClick={() => navigate("/Manager/AuctionDetail", {
                          state: auction // Đảm bảo auction object có đầy đủ dữ liệu
                        })}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No auctions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAuction;

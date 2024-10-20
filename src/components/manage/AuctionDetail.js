import React, { useEffect } from "react";
import "./AuctionDetail.scss";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { useLocation } from "react-router";
const AuctionDetail = () => {

    const location = useLocation();
    const auction = location.state || {}; // Default to empty object

    // Chỉ log một lần trong useEffect
    useEffect(() => {
        console.log("Location Object:", location);
        console.log("Auction Data:", auction);
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
                {/* <div className="navigation-bar-vertically">
                    <a className="member">Member</a>
                    <a className="breeder">Breeder</a>
                    <a className="request">Request</a>
                    <a className="auction-vertically">Auction</a>
                    <a className="koi">KOI</a>
                    <a className="blog-vertically">Blog</a>
                </div> */}
                <VerticallyNavbar></VerticallyNavbar>

                <div className="body-content-right-auction-detail">
                    <div className="auction-detail-content">
                        <div className="auction-detail-content-row1">
                            <div className="status">Status: &nbsp;
                                {auction.status === 1 && 'Preparing'}
                                {auction.status === 2 && 'Waiting'}
                                {auction.status === 3 && 'Bidding'}
                                {auction.status === 4 && 'Ended'}
                            </div>
                            <select name="" id="" className="set-status" >
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
                                type="datetime"
                                className="start-date-input"
                                value={auction?.startDate || "YYYY/MM/DD hh:mm:ss"}
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
                                    <tr>
                                        <td>1</td>
                                        <td>Fish 1</td>
                                        <td>

                                            <input
                                                type="datetime-local"
                                                className="start-time-input"></input>
                                        </td>
                                        <td>
                                            <input
                                                type="datetime-local"
                                                className="finish-time-input"></input>
                                        </td>
                                        <td>Bidding</td>
                                        <td>
                                            <button className="update-btn">Update</button>
                                        </td>
                                        <td><i class="fa-solid fa-trash"></i></td>
                                    </tr>
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
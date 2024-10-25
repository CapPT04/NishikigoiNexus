import React, { useEffect, useState } from 'react';
import './AuctionScreen.scss';
import logo from '../../../assets/images/logo_png.png'; // Adjust based on your file structure
import instagramIcon from '../../../assets/images/Instagram.svg';
import facebookIcon from '../../../assets/images/Social Icons (1).svg';
import googleIcon from '../../../assets/images/Vector.svg';
import Navbar from '../../common/Navbar/Navbar';
import { handleGetPublicAuctionsApi } from "../../../axios/UserService";
import { Navigate, useNavigate } from 'react-router';

const AuctionScreen = () => {
    const [publicAuctions, setPublicAuctions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await handleGetPublicAuctionsApi();
                setPublicAuctions(response.data.$values);
                console.log(response.data.$values);

            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        fetchAuctions();
    }, []);

    return (
        <div className="auction-screen">
            <div className='header'>
                <Navbar />
            </div>
            {publicAuctions.length === 0 ? (
                <div className="auction-screen-content1">
                    <div className="no-auctions-message">
                        Currently, there are no auctions in progress.
                    </div>
                </div>
            ) : (
                <div className="auction-screen-content">
                    {publicAuctions.map((auction, idx) => (
                        <div key={idx} className="auction-item">
                            <div className="auction-item-row1">
                                <div className="auction-id">Auction: #{auction.auctionId}</div>
                                <div className="auction-fish-number">{auction.fishEntryCount} Fishes</div>
                            </div>
                            <div className="auction-item-row2">
                                <div className={`auction-status`}>
                                    {auction.status === 2 && "Waiting"}
                                    {auction.status === 3 && "Bidding"}
                                    {auction.status === 4 && "Ended"}
                                </div>
                                <div className="auction-details">
                                    <i
                                        className="fa-solid fa-arrow-right auction-details-icon"
                                        onClick={() => navigate("/AuctionDetails", {
                                            state: auction
                                        })}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <footer className="footer">
                <div className="logo-footer">
                    <img className="logo-img-footer" src={logo} alt="Logo Footer" />
                    <div className="name-project-footer">Nishikigoi Nexus</div>
                </div>
                <div className="social-contact">
                    <div className="instagram">
                        <img src={instagramIcon} alt="Instagram" />
                    </div>
                    <div className="facebook">
                        <img src={facebookIcon} alt="Facebook" />
                    </div>
                    <div className="google">
                        <img src={googleIcon} alt="Google" />
                    </div>
                </div>
                <div className="nav-bar-footer">
                    <a href="#">Home</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                    <a href="#">About</a>
                </div>
            </footer>
        </div>
    );



};

export default AuctionScreen;

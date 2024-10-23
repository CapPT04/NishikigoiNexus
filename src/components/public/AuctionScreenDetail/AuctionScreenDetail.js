import React from 'react';
import './AuctionScreenDetail.scss';
import AuctionItemImg from '../../../assets/images/login.png';
import logo from '../../../assets/images/logo_png.png';
import instagramIcon from '../../../assets/images/Instagram.svg';
import facebookIcon from '../../../assets/images/Social Icons (1).svg';
import googleIcon from '../../../assets/images/Vector.svg';
import Navbar from '../../common/Navbar/Navbar';

const AuctionScreenDetail = () => {
    return (
        <div className="auction-screen-detail">
            <header className="header">
                <div className="navigation-bar">
                    <div className="navigation-bar-left-content">
                        <img className="logo" src={logo} alt="Logo" />
                        <div className="project-name">Nishikigoi Nexus</div>
                    </div>
                    <div className="navigation-bar-right-content">
                        <a className="home" href="#">HOME</a>
                        <a className="auction" href="#">AUCTION</a>
                        <a className="blog" href="#">BLOG</a>
                        <a className="about" href="#">ABOUT</a>
                        <div className="account">ACCOUNT</div>
                    </div>
                </div>
            </header>

            <div className="auction-screen-detail-content">
                <div className="auction-screen-id">
                    Auction#13
                </div>
                <div className="auction-screen-ending-time">
                    Ending in: 4:13:03
                </div>

                <div className="auction-screen-detail-content-row">
                    {[...Array(3)].map((_, index) => (
                        <div className="fish-auction" key={index}>
                            <div className="fish-auction-img">
                                <img src={AuctionItemImg} alt="Fish" />
                            </div>
                            <div className="fish-auction-center-content">
                                <div className="fish-auction-name">Ca ngu</div>
                                <div className="fish-auction-ending-time">Ending in: 21:14</div>
                                <div className="fish-auction-price">$ 100</div>
                            </div>
                            <div className="fish-auction-left-content">
                                <div className="fish-auction-method">Method: Public bidding</div>
                                <div className="fish-auction-size">Size: 1244mm</div>
                                <div className="fish-auction-origin">Origin: Niigata, Japan</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="auction-screen-detail-content-row">
                    {[...Array(3)].map((_, index) => (
                        <div className="fish-auction" key={index}>
                            <div className="fish-auction-img">
                                <img src={AuctionItemImg} alt="Fish" />
                            </div>
                            <div className="fish-auction-center-content">
                                <div className="fish-auction-name">Ca ngu</div>
                                <div className="fish-auction-ending-time">Ending in: 21:14</div>
                                <div className="fish-auction-price">$ 100</div>
                            </div>
                            <div className="fish-auction-left-content">
                                <div className="fish-auction-method">Method: Public bidding</div>
                                <div className="fish-auction-size">Size: 1244mm</div>
                                <div className="fish-auction-origin">Origin: Niigata, Japan</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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

export default AuctionScreenDetail;

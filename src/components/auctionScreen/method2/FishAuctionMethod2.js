import { useState, useEffect } from 'react';
import './FishAuctionMethod2.scss';
import logo from '../../../assets/images/logo_png.png';
import instagramIcon from '../../../assets/images/Instagram.svg';
import facebookIcon from '../../../assets/images/Social Icons (1).svg';
import googleIcon from '../../../assets/images/Vector.svg';
import body1 from '../../../assets/images/body1.png';
import { useLocation } from 'react-router';


const FishAuctionMethod2 = () => {
    const location = useLocation();
    const auctionItem = useLocation().state.auctionItem;
    const auctionId = useLocation().state.auctionId;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Change to false for 24-hour format
        });
    };
    console.log(auctionItem);
    console.log(location);

    useEffect(() => {



    }, [])


    return (
        <div>
            <div className="header">
                <div className="navigation-bar">
                    <div className="navigation-bar-left-content">
                        <img className="logo" src={logo} alt="Nishikigoi Nexus Logo" />
                        <div className="project-name">Nishikigoi Nexus</div>
                    </div>
                    <div className="navigation-bar-right-content">
                        <a href="#" className="home">HOME</a>
                        <a href="#" className="auction">AUCTION</a>
                        <a href="#" className="blog">BLOG</a>
                        <a href="#" className="about">ABOUT</a>
                        <div className="account">ACCOUNT</div>
                    </div>
                </div>
            </div>

            <div className="fish-aucction-method3-content">
                <div className="fish-aucction-method3-content-row1">Auction#{auctionId}</div>
                <div className="fish-aucction-method3-content-row2">Ending in: </div>
                <div className="fish-aucction-method3-content-row3">
                    <div className="fish-aucction-method3-content-row3-col1">
                        <img className="main-fish-img" src={auctionItem.images.$values[0].imagePath} alt="Main Fish" />
                        <div className="fish-sub-img">
                            {/* <div className="fish-sub-img1" onMouseEnter={() => handleImageHover('../../assets/images/body1.png')}>
                                <img src="" alt="Sub Image 1" />
                            </div>
                            <div className="fish-sub-img1" onMouseEnter={() => handleImageHover('../../assets/images/login1.png')}>
                                <img src="../../assets/images/login1.png" alt="Sub Image 2" />
                            </div>
                            <div className="fish-sub-img1" onMouseEnter={() => handleImageHover('../../assets/images/login1.png')}>
                                <img src="../../assets/images/login1.png" alt="Sub Image 3" />
                            </div>
                            <div className="fish-sub-img1" onMouseEnter={() => handleImageHover('../../assets/images/login1.png')}>
                                <img src="../../assets/images/login1.png" alt="Sub Image 4" />
                            </div> */}
                        </div>
                    </div>

                    <div className="fish-aucction-method3-content-row3-col2">
                        <div className="fish-info">
                            <div className="fish-info-row1">
                                <div className="fish-info-name">{auctionItem.name}</div>
                                <div className="fish-info-notion">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                </div>
                            </div>
                            <div className="fish-info-row2">
                                <div className="fish-info-ending">Ending in: {formatDate(auctionItem.endTime)}</div>
                                <div className="fish-info-tag">
                                    <i class="fa-solid fa-tag"></i>
                                    <div className="fish-number">Fish#{auctionItem.fishEntryId}</div>
                                </div>
                            </div>
                            <div className="fish-info-row3">
                                <div className="fish-info-weight">
                                    <i class="fa-solid fa-weight-hanging"></i>
                                    <div className="weight-number">{auctionItem.weight}</div>
                                </div>
                                <div className="fish-info-length">
                                    <i class="fa-solid fa-ruler"></i>
                                    <div className="length-number">{auctionItem.size}</div>
                                </div>
                            </div>
                            <div className="fish-info-row4">
                                <div className="fish-info-gender">
                                    <i class="fa-solid fa-venus-mars"></i>
                                    <div className="gender-text">
                                        {auctionItem.gender == 1 && "Male"}
                                        {auctionItem.gender == 2 && "Female"}
                                    </div>
                                </div>
                                <div className="fish-info-age">
                                    <i class="fa-solid fa-calendar"></i>
                                    <div className="age-text">{auctionItem.age}</div>
                                </div>
                            </div>
                            <div className="fish-info-row5">
                                <div className="fish-info-origin">
                                    <i class="fa-solid fa-earth-americas"></i>

                                    <div className="origin-text">{auctionItem.origin}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bidding-history-background">
                            <div className="bidding-history-content">
                                <div className="bidding-history-info">
                                    <div className="bidding-time">2024/10/15 10:47:10 &nbsp</div>
                                    <div className="bidding-name-bidder">Thinh Dinh placed a bid &nbsp</div>
                                </div>
                                {/* You can repeat bidding history info like above as needed */}
                            </div>
                        </div>

                        <div className="place-bid">
                            <div className="place-bid-content">
                                <div className="place-bid-content-row1">
                                    <div className="number-of-bidders-icon">
                                        <i class="fa-solid fa-users-line"></i>
                                    </div>
                                    <div className="number-of-bidders-text">Number of bidders</div>
                                    <div className="number-of-bidders">4</div>
                                </div>
                                <hr />
                                <div className="place-bid-content-row2">
                                    <div className="min-price-icon">
                                        <i class="fa-solid fa-file-invoice-dollar"></i>
                                    </div>
                                    <div className="min-price-text">Min price: $100</div>
                                </div>
                                <input type="number" className="place-bid-content-row3" />
                                <button className="place-bid-btn">Place bid at $</button>
                                <button className="substract">Decrease Bid</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="logo-footer">
                    <img className="logo-img-footer" src={logo} alt="Nishikigoi Nexus Logo" />
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

export default FishAuctionMethod2;

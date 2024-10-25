import { useState, useEffect } from 'react';
import './FishAuctionMethod4.scss';
import logo from '../../../assets/images/logo_png.png';
import instagramIcon from '../../../assets/images/Instagram.svg';
import facebookIcon from '../../../assets/images/Social Icons (1).svg';
import googleIcon from '../../../assets/images/Vector.svg';
import body1 from '../../../assets/images/body1.png';
import { useLocation } from 'react-router';
import Navbar from '../../common/Navbar/Navbar';
import { handleGetFishImgById } from '../../../axios/UserService';
import Swal from 'sweetalert2';
import startPriceIcon from '../../../assets/images/mintmark.svg';

const FishAuctionMethod4 = () => {
    const location = useLocation();
    const [auctionItem, setAuctionItem] = useState(location.state.auctionItem);
    const auctionId = location.state.auctionId;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };
    const [amount, setAmount] = useState("");
    // console.log(amount);
    const [mainImage, setMainImage] = useState("");
    const [fishImage, setFishImage] = useState([]);





    console.log(sessionStorage.getItem("token"));

    useEffect(() => {

        const fetchImageFish = async () => {
            try {
                setMainImage(auctionItem.images.$values[0]?.imagePath);
                const response = await handleGetFishImgById(auctionItem.images.$values[0].fishId);
                setFishImage(response.data.$values);
                // console.log(response.data.$values);


            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchImageFish();
    }, [])





    useEffect(() => {
        console.log("img:", fishImage);

    })


    return (
        <div>
            <div className="header">
                <Navbar />
            </div>

            <div className="fish-aucction-method3-content">
                <div className="fish-aucction-method3-content-row1">Auction#{auctionId}</div>
                <div className="fish-aucction-method3-content-row2">Ending in: </div>
                <div className="fish-aucction-method3-content-row3">
                    <div className="fish-aucction-method3-content-row3-col1">
                        <img className="main-fish-img" src={mainImage} alt="Main Fish" />
                        <div className="fish-sub-img">
                            {fishImage.map((img, index) => (
                                <div
                                    key={index}
                                    className="fish-sub-img1"
                                    onMouseEnter={() => setMainImage(img.imagePath)} // Hover to change main image
                                    onMouseLeave={() => setMainImage(fishImage[0].imagePath)}
                                >
                                    <img src={img.imagePath} alt={`Fish ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fish-aucction-method3-content-row3-col2">
                        <div className="fish-info">
                            <div className="fish-info-row1">
                                <div className="fish-info-name">{auctionItem.name}</div>
                                <div className="fish-info-notion">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                </div>
                            </div>
                            <div className="fish-info-row2">
                                <div className="fish-info-ending">Ending in: {formatDate(auctionItem.endTime)}</div>
                                <div className="fish-info-tag">
                                    <i className="fa-solid fa-tag"></i>
                                    <div className="fish-number">Fish#{auctionItem.fishEntryId}</div>
                                </div>
                            </div>
                            <div className="fish-info-row3">
                                <div className="fish-info-weight">
                                    <i className="fa-solid fa-weight-hanging"></i>
                                    <div className="weight-number">{auctionItem.weight}</div>
                                </div>
                                <div className="fish-info-length">
                                    <i className="fa-solid fa-ruler"></i>
                                    <div className="length-number">{auctionItem.size}</div>
                                </div>
                            </div>
                            <div className="fish-info-row4">
                                <div className="fish-info-gender">
                                    <i className="fa-solid fa-venus-mars"></i>
                                    <div className="gender-text">
                                        {auctionItem.gender === 1 && "Male"}
                                        {auctionItem.gender === 2 && "Female"}
                                    </div>
                                </div>
                                <div className="fish-info-age">
                                    <i className="fa-solid fa-calendar"></i>
                                    <div className="age-text">{auctionItem.age}</div>
                                </div>
                            </div>
                            <div className="fish-info-row5">
                                <div className="fish-info-origin">
                                    <i className="fa-solid fa-earth-americas"></i>
                                    <div className="origin-text">{auctionItem.origin}</div>
                                </div>
                            </div>
                        </div>
                        <div class="place-bid">
                            <div class="place-bid-content">
                                <div class="place-bid-content-row1">
                                    <div class="start-price-icon">
                                        <img src={startPriceIcon} alt="" />

                                    </div>
                                    <div class="start-price-text">
                                        Start price
                                    </div>
                                    <div class="start-price">
                                        ${auctionItem.min}
                                    </div>
                                </div>
                                <hr />
                                <div class="place-bid-content-row2">
                                    <div class="current-price-icon">
                                        <i class="fa-solid fa-file-invoice-dollar"></i>
                                    </div>
                                    <div class="current-price-text">Current price: $100</div>

                                </div>
                                <button class="place-bid-btn">Place bid at $150</button>
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

export default FishAuctionMethod4;

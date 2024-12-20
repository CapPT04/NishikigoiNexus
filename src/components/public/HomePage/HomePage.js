import React, { useEffect, useState } from "react";
import "../HomePage/HomePage.scss";
import logo from "../../../assets/images/logo_png.png";
import sample_fish from "../../../assets/images/Rectangle 7.png";
import body_img_1 from "../../../assets/images/body1.png";
import body_img_2 from "../../../assets/images/boyd2.png";
import instagram from "../../../assets/images/Instagram.svg";
import facebook from "../../../assets/images/Social Icons (1).svg";
import google from "../../../assets/images/Vector.svg";
import Navbar from "../../common/Navbar/Navbar";
import { wait } from "@testing-library/user-event/dist/utils";
import { handleFishForHomePage } from "../../../axios/UserService";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [fishHomePage, setFishHomePage] = useState("");
  const navigate = useNavigate();
  const startFish = async () => {
    const resFish = await handleFishForHomePage();
    setFishHomePage(resFish.data);
    // console.log(resFish.data);
  };
  const formatMoney = (value) => {
    // Convert the value to a string and take only the integer part
    let integerPart = String(Math.floor(Number(value)));
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted integer part
    return integerPart;
  };
  useEffect(() => {
    startFish();
  }, []);

  return (
    <div className="home-page">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="header-parent">
        <div className="slogan-homepage">
          <div className="slogan-above">BIDDING FOR</div>
          <div className="slogan-under">BEAUTY</div>
        </div>
        <div className="content-extra-parent">
          <div
            className="content-extra"
            onClick={() =>
              navigate(`/AuctionFishMethod${fishHomePage.auctionMethod}`, {
                state: { fishHomePage, auctionId: fishHomePage.auctionId },
              })
            }
          >
            <div className="representative-sample-fish">
              <img
                className="representative-sample-fish-img"
                src={fishHomePage.fishImage}
                alt="Fish Random"
              />
              <div className="representative-sample-fish-details">
                <div className="representative-sample-fish-name">
                  {fishHomePage.fishName}
                </div>
                <div className="representative-sample-auction-number">
                  Auction #{fishHomePage.auctionId}
                </div>
                <div className="representative-sample-fish-start-price">
                  Start price: {formatMoney(fishHomePage.startPrice)} VND
                </div>
                <div
                  className="representative-sample-fish-fish-status"
                  style={{
                    color:
                      fishHomePage.fishEntryStatus === "Bidding"
                        ? "#34a853"
                        : fishHomePage.fishEntryStatus === "Waiting"
                        ? "yellow"
                        : "red",
                  }}
                >
                  Status: {fishHomePage.fishEntryStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="body-content">
        <div className="body-1">
          <div className="body-1-text">
            <div className="body-1-title">
              Discover Exquisite Nishikigoi
              <div className="red-rectangle"></div>
            </div>
            <div className="body-1-content">
              Our meticulously curated auctions showcase an impressive array of
              Nishikigoi varieties, from the timeless beauty of Kohaku to the
              shimmering scales of Gin Rin. Each fish is carefully selected for
              its quality, pattern, and lineage, ensuring that only the finest
              living art pieces grace our virtual auction space.
            </div>
          </div>
          <div className="body-1-img">
            <img src={body_img_1} alt="body-1-img" />
          </div>
        </div>
        <div className="body-2">
          <div className="body-2-img">
            <img src={body_img_2} alt="body-2-img" />
          </div>
          <div className="body-2-text">
            <div className="body-2-title">
              <div className="red-rectangle"></div>
              More Than Just an Auction
            </div>
            <div className="body-2-content">
              Nishikigoi Nexus is the central hub for all things Nishikigoi.
              Explore our resources section for expert advice on Nishikigoi
              care, pond management, and the latest trends in the Nishikigoi
              world. Connect with fellow enthusiasts in our forums to share
              experiences and deepen your appreciation for these living works of
              art.
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="logo-footer">
          <img
            className="logo-img-footer"
            src={logo}
            alt="Logo NishikigoiNexus"
          />
          <div className="name-project-footer">Nishikigoi Nexus</div>
        </div>
        <div className="social-contact">
          <div className="instagram">
            <img src={instagram} alt="" />
          </div>
          <div className="facebook">
            <img src={facebook} alt="" />
          </div>
          <div className="google">
            <img src={google} alt="" />
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

export default HomePage;

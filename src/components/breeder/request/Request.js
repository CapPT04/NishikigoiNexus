import React, { useEffect, useState, useRef } from "react";
import "../request/Request.scss";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "../../../upload/ConfigUpload";
import { handleFeeApi, handleSubmitRequest } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const Request = () => {
  const [name, setName] = useState("");
  const [shape, setShape] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [size, setSize] = useState(0);
  const [origin, setOrigin] = useState("");
  const [pondAddress, setPondAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState({ value: 0 });
  const [image, setImage] = useState([]);
  const [note, setNote] = useState("");
  const [auctionMethod, setAuctionMethod] = useState(1);
  const [date, setDate] = useState("");
  const [startPrice, setStartPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fee, setFee] = useState(0);
  const [btnReady, setBtnReady] = useState(true);

  const navigate = useNavigate();

  //----------- upload anh----------
  const [img, setImg] = useState("");
  const fileInputRef = useRef(null);
  const handleUpload = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
    try {
      const imgRef = ref(imageDB, `KoiImages/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImage((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };
  const handleButtonClick = (e) => {
    if (image[e]) {
      image.splice(e, 1);
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  //-----get fee--------
  useEffect(() => {
    const getFee = async () => {
      try {
        const response = await handleFeeApi();
        // console.log(response.data);
        setFee(response.data);
        // console.log("done");
      } catch (error) {
        console.log(error);
      }
    };
    getFee();
  }, []);
  //--------
  const formatPrice = (value) => {
    // Ensure the value is a number or a string
    let [integerPart, decimalPart] = String(value).split(".");
    // Remove non-digit characters from the integer part
    integerPart = integerPart.replace(/\D/g, "");
    // Format the integer part with commas as thousand separators
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Return the formatted number with the decimal part (if present)
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
  };
  //..........

  const steps = [
    { title: "Fish Details", subtitle: "Enter information about Fish" },
    { title: "Auction Method", subtitle: "Choose the auction method" },
    { title: "Auction Detail", subtitle: "Provide auction details" },
    { title: "Preview", subtitle: "Preview your request" },
  ];
  const methodDexcription = [
    {
      title: "Fixed Price",
      subtitle:
        "This is a fixed-price auction method where an item or asset is sold at a predetermined price. Buyers only need to accept the price to complete the transaction without any bidding process.",
    },
    {
      title: "Secret Auction",
      subtitle:
        "In a secret bid auction, participants submit sealed bids that remain confidential. The highest bidder wins without knowing other participants' bids, promoting privacy and fairness.",
    },
    {
      title: "Public Auction",
      subtitle:
        "A public bid auction is fully transparent, where all bids are visible to participants. Bidders can see others' offers and increase their bids until no one is willing to pay a higher price.",
    },
    {
      title: "Descending price auction",
      subtitle:
        "In this descending-price auction, the seller starts with a high price and gradually lowers it until a buyer accepts the current price, creating a unique urgency among potential buyers.",
    },
  ];
  const filedsets = [
    {
      title: "Fish Details",
      content: (
        <fieldset>
          {/* name+shape */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fish Name</h5>
              <input
                type="text"
                name="fishName"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Shape</h5>
              <input
                type="text"
                name="FishShape"
                onChange={(e) => setShape(e.target.value)}
              />
            </div>
          </div>
          {/* age+weight */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fish Age</h5>
              <input
                type="text"
                name="FishAge (month)"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Weight</h5>
              <input
                type="text"
                name="FishWeight (gram)"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          {/* size+origin */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fish Size</h5>
              <input
                type="text"
                name="FishSize (mm)"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Origin</h5>
              <input
                type="text"
                name="FishOrigin"
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>
          {/* PondAddress+City */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fond Address</h5>
              <input
                type="text"
                name="FondArrdess"
                onChange={(e) => setPondAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish City</h5>
              <input
                type="text"
                name="FishCity"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          {/* gender */}
          <div className="fieldInput">
            <div className="col-md-6 gender-group">
              <div className="gender">Gender:</div>
              <div className="gender-select">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender.value === 2}
                  className="gender-option"
                  onChange={() => setGender({ value: 2 })}
                />
                <div>Female</div>
              </div>
              <div className="gender-select">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender.value === 1}
                  className="gender-option"
                  onChange={() => setGender({ value: 1 })}
                />
                <div>Male</div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          {/* img */}
          <div className="fieldInput">
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="imgInput" onClick={(e) => handleButtonClick(0)}>
              {image[0] ? (
                <img src={image[0]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput" onClick={(e) => handleButtonClick(1)}>
              {image[1] ? (
                <img src={image[1]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput" onClick={(e) => handleButtonClick(2)}>
              {image[2] ? (
                <img src={image[2]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput" onClick={(e) => handleButtonClick(3)}>
              {image[3] ? (
                <img src={image[3]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
          </div>
        </fieldset>
      ),
    },
    {
      title: "Auction Method",
      content: (
        <fieldset>
          <div className="fieldInput">
            <select
              name="auctionMethod"
              className="auctionMethod"
              onChange={(e) => setAuctionMethod(e.target.value)}
            >
              <option value="1">Fixed Price</option>
              <option value="2">Secret Auction</option>
              <option value="3">Public Auction</option>
              <option value="4">Descending Auction</option>
            </select>
          </div>
          <div>
            {methodDexcription.map((item, index) => (
              <h4
                key={index}
                style={{
                  display: index === auctionMethod - 1 ? "block" : "none",
                }}
              >
                {" "}
                {item.subtitle}{" "}
              </h4>
            ))}
          </div>
        </fieldset>
      ),
    },
    {
      title: "Auction Detail",
      content: (
        <fieldset>
          <div className="fieldInput">
            <div className="inputBox">
              <h5>Expected Auction Date</h5>
              <input
                type="date"
                name="autionDate"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="fieldInput">
            <div className="inputBox">
              <h5>{auctionMethod === "1" ? "Fixed Price" : "Start Price"}</h5>
              <div className="price">
                <input
                  type="number"
                  name="auctionPrice"
                  min={0}
                  onChange={(e) => setStartPrice(e.target.value)}
                  className="input-price"
                />
                <span className="dollar-sign">vnd</span>
              </div>
              <div className="noticeBox">
                Please enter amount in multiples of 10000
              </div>
            </div>
          </div>
          <div
            className="fieldInput"
            style={{
              display: auctionMethod === "4" ? "" : "none",
            }}
          >
            <div className="inputBox">
              <h5>Max Price</h5>
              <div className="price">
                <input
                  type="number"
                  min={0}
                  name="auctionPrice"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span className="dollar-sign">vnd</span>
              </div>
              <div className="noticeBox">
                Please enter amount in multiples of 10000
              </div>
            </div>
          </div>
          <div
            className="fieldInput"
            style={{ display: auctionMethod === "3" ? "" : "none" }}
          >
            <div className="inputBox">
              <h5>Increment Step</h5>
              <div className="price">
                <input
                  type="number"
                  name="incrementStep"
                  min={0}
                  onChange={(e) => setStepPrice(e.target.value)}
                />
                <span className="dollar-sign">vnd</span>
              </div>
              <div className="noticeBox">
                Please enter amount in multiples of 10000
              </div>
            </div>
          </div>
          {/* note */}
          <div className="inputBox">
            <h5>Note</h5>
            <input
              type="text"
              name="Note"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </fieldset>
      ),
    },
    {
      title: "Preview",
      content: (
        <fieldset>
          {/* name+shape */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fish Name</h5>
              <input type="text" name="fishName" value={name} disabled={true} />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Shape</h5>
              <input
                type="text"
                name="FishShape"
                value={shape}
                disabled={true}
              />
            </div>
          </div>
          {/* age+weight */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fish Age</h5>
              <input type="text" name="FishAge" disabled={true} value={age} />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Weight</h5>
              <input
                type="text"
                name="FishWeight"
                disabled={true}
                value={weight}
              />
            </div>
          </div>
          {/* PondAddress+City */}
          <div className="fieldInput">
            <div className="col-md-6 inputBox">
              <h5>Fond Address</h5>
              <input
                type="text"
                name="FondArrdess"
                value={pondAddress}
                disabled={true}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish City</h5>
              <input type="text" name="FishCity" value={city} disabled={true} />
            </div>
          </div>
          {/* gender */}
          <div className="fieldInput">
            <div className="col-md-6 gender-group">
              <div className="gender">Gender:</div>
              <div className="gender-select">
                <input
                  type="radio"
                  name="gender"
                  checked={gender.value === 2}
                  disabled={true}
                  className="gender-option"
                />
                <div>Female</div>
              </div>
              <div className="gender-select">
                <input
                  type="radio"
                  name="gender"
                  checked={gender.value === 1}
                  disabled={true}
                  className="gender-option"
                />
                <div>Male</div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          {/* img */}
          <div className="fieldInput">
            <div className="imgInput">
              {image[0] ? (
                <img src={image[0]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput">
              {image[1] ? (
                <img src={image[1]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput">
              {image[2] ? (
                <img src={image[2]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
            <div className="imgInput">
              {image[3] ? (
                <img src={image[3]} className="imgKoi" />
              ) : (
                <div className="plus-icon"></div>
              )}
            </div>
          </div>

          {/* method */}
          {methodDexcription.map((item, index) => (
            <h5
              key={index}
              style={{
                display: index === auctionMethod - 1 ? "block" : "none",
                fontSize: "24px",
              }}
            >
              {"Auction Method: "}
              {item.title}{" "}
            </h5>
          ))}
          {/* method detail */}
          <div className="inputBox">
            <h5>Auction Date</h5>
            <input type="date" name="autionDate" value={date} disabled={true} />
          </div>
          <div className="inputBox">
            <h5>{auctionMethod === "1" ? "Fixed Price" : "Start Price"}</h5>
            <div className="price">
              <input
                type="text"
                name="auctionPrice"
                value={startPrice ? formatPrice(startPrice) : ""}
                disabled={true}
              />
              <span className="dollar-sign">vnd</span>
            </div>
          </div>
          <div
            className="inputBox"
            style={{
              display: auctionMethod === "4" ? "" : "none",
            }}
          >
            <h5>Max Price</h5>
            <div className="price">
              <input
                type="text"
                name="auctionPrice"
                placeholder="XXXXXXX"
                value={maxPrice ? formatPrice(maxPrice) : ""}
                disabled={true}
              />
              <span className="dollar-sign">vnd</span>
            </div>
          </div>
          <div
            className="inputBox"
            style={{ display: auctionMethod === "3" ? "" : "none" }}
          >
            <h5>Increment Step</h5>
            <div className="price">
              <input
                type="text"
                name="incrementStep"
                placeholder="XXXXXXX"
                value={stepPrice ? formatPrice(stepPrice) : ""}
                disabled={true}
              />
              <span className="dollar-sign">vnd</span>
            </div>
          </div>
          {/* note */}
          <div className="inputBox">
            <h5>Note</h5>
            <input type="text" name="Note" value={note} disabled={true} />
          </div>
          {/* auction fee */}
          <div className="feeNotice">
            * The fee for auction: {formatPrice(fee)} VND
          </div>
          <div className="feeNotice">
            * When the fish auction is successful, we will take a commission
            from the successful auction amount.{" "}
          </div>
          {/* confirm */}
          <div className="confirmBox">
            <input
              type="checkbox"
              className="checkBox"
              onChange={() => {
                setBtnReady(!btnReady);
              }}
            />
            <p>
              By checking this box, you confirm that the above information is
              true. Any incorrect information will be your responsibility. In
              addition, you also accept the auction fee that we provide.
            </p>
          </div>
        </fieldset>
      ),
    },
  ];

  //-----next step --------
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  //----submit----
  // chưa có trả về kết quả
  const handleSubmit = async () => {
    // console.log(sessionStorage.getItem("token"));

    const fishAuction = {
      token: sessionStorage.getItem("token"),
      fishName: name,
      shape: shape,
      size: size,
      origin: origin,
      age: age,
      weight: weight,
      gender: gender.value,
      pondAddress: pondAddress,
      pondCity: city,
      imagePath: image,
      note: note,
      fee: fee,
      auctionMethod: auctionMethod,
      minPrice: startPrice,
      maxPrice: maxPrice,
      increment: stepPrice,
      expectedDate: date,
    };
    if (btnReady === true) {
      toast.error("Please accept fee before submit your request", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      startPrice % 10000 !== 0 ||
      maxPrice % 10000 !== 0 ||
      stepPrice % 10000 !== 0
    ) {
      toast.error(
        "Please enter the correct amount before submit your request",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      try {
        const response = await handleSubmitRequest(fishAuction);
        if (response.status === 200) {
          toast.success("Created new request successfully! Redirecting...", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/Breeder/HistoryRequest");
          }, 2000);
        } else {
          //response.data.errors.NewRequest[0]
          toast.error("Some fields are incorrect. Please check again", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {}
    }
  };
  //--------

  return (
    <div className="request-form">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form className="request-content">
            <ul className="progressbar">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={index <= currentStep ? "active" : ""}
                >
                  {step.title}
                </li>
              ))}
            </ul>

            {steps.map((step, index) => (
              <fieldset
                key={index}
                style={{ display: index === currentStep ? "block" : "none" }}
              >
                <h2 className="fs-title">{step.title}</h2>
                <h3 className="fs-subtitle">{step.subtitle}</h3>

                {/* Example field input */}
                {filedsets[index]?.content}

                <div className="action-buttons">
                  {index > 0 && (
                    <button
                      type="button"
                      className="previous action-button-previous"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                  )}
                  {index < steps.length - 1 ? (
                    <button
                      type="button"
                      className="next action-button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      name="submit"
                      className={`submit action-button `}
                      onClick={handleSubmit}
                      // disabled={btnReady}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </fieldset>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;

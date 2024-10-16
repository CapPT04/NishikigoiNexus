import React, { useEffect, useState, useRef } from "react";
import "../request/Request.scss";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "../../../upload/ConfigUpload";
import { handleFeeApi, handleSubmitRequest } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";

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
  const [fee, setFee] = useState("");
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

  const steps = [
    { title: "Fish Details", subtitle: "Enter information about Fish" },
    { title: "Auction Method", subtitle: "Choose the auction method" },
    { title: "Auction Detail", subtitle: "Provide auction details" },
    { title: "Preview", subtitle: "Preview your request" },
  ];
  const methodDexcription = [
    { title: "Fixed Price", subtitle: "Buyer pays a fixed price" },
    { title: "Hidden Auction", subtitle: "Buyer pays the hidden price" },
    { title: "Public Auction", subtitle: "Buyer pays the highest price" },
    {
      title: "Descending price auction",
      subtitle: "Buyer pays the price",
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
                placeholder="Fish Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Shape</h5>
              <input
                type="text"
                name="FishShape"
                placeholder="Fish Shape"
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
                name="FishAge"
                placeholder="Fish Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Weight</h5>
              <input
                type="text"
                name="FishWeight"
                placeholder="Fish Weight"
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
                name="FishSize"
                placeholder="Fish Size"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish Origin</h5>
              <input
                type="text"
                name="FishOrigin"
                placeholder="Fish Origin"
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
                placeholder="Fond Arrdess"
                onChange={(e) => setPondAddress(e.target.value)}
              />
            </div>
            <div className="col-md-6 inputBox">
              <h5>Fish City</h5>
              <input
                type="text"
                name="FishCity"
                placeholder="Fish City"
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
              <option value="2">Hidden Auction</option>
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
              <h5>Auction Date</h5>
              <input
                type="date"
                name="autionDate"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="fieldInput">
            <div className="inputBox">
              <h5>{auctionMethod === "1" ? "Fixed Price" : "Min Price"}</h5>
              <div className="price">
                <input
                  type="text"
                  name="auctionPrice"
                  placeholder="XXXXXXX"
                  onChange={(e) => setStartPrice(e.target.value)}
                  className="input-price"
                />
                <span className="dollar-sign">$</span>
              </div>
            </div>
          </div>
          <div
            className="fieldInput"
            style={{
              display:
                auctionMethod === "3" || auctionMethod === "4" ? "" : "none",
            }}
          >
            <div className="inputBox">
              <h5>Max Price</h5>
              <div className="price">
                <input
                  type="text"
                  name="auctionPrice"
                  placeholder="XXXXXXX"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span className="dollar-sign">$</span>
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
                  type="text"
                  name="incrementStep"
                  placeholder="XXXXXXX"
                  onChange={(e) => setStepPrice(e.target.value)}
                />
                <span className="dollar-sign">$</span>
              </div>
            </div>
          </div>
          {/* note */}
          <div className="inputBox">
            <h5>Note</h5>
            <input
              type="text"
              name="Note"
              placeholder="Note"
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
            <h5>{auctionMethod === "1" ? "Fixed Price" : "Min Price"}</h5>
            <div className="price">
              <input
                type="text"
                name="auctionPrice"
                value={startPrice}
                disabled={true}
              />
              <span className="dollar-sign">$</span>
            </div>
          </div>
          <div
            className="inputBox"
            style={{
              display:
                auctionMethod === "3" || auctionMethod === "4" ? "" : "none",
            }}
          >
            <h5>Max Price</h5>
            <div className="price">
              <input
                type="text"
                name="auctionPrice"
                placeholder="XXXXXXX"
                value={maxPrice}
                disabled={true}
              />
              <span className="dollar-sign">$</span>
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
                value={stepPrice}
                disabled={true}
              />
              <span className="dollar-sign">$</span>
            </div>
          </div>
          {/* note */}
          <div className="inputBox">
            <h5>Note</h5>
            <input type="text" name="Note" value={note} disabled={true} />
          </div>
          {/* auction fee */}
          <div className="feeNotice">* The fee for auction: {fee}$</div>
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
    console.log(sessionStorage.getItem("token"));

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
    try {
      const response = await handleSubmitRequest(fishAuction);
      if (response.status === 200) {
        navigate("/HistoryRequest");
      }
    } catch (error) {}
  };
  //--------

  return (
    <div className="request-form">
      <div className="header"></div>

      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form className="request">
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
                      className="submit action-button"
                      onClick={handleSubmit}
                      disabled={btnReady}
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

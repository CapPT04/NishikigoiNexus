import React from "react";
import { useEffect, useState, useRef } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "./ConfigUpload";
import "./UploadAnh.scss";

const UploadAnh = () => {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const fileInputRef = useRef(null); // Tạo ref cho ô input

  // Function to handle the upload
  const handleUpload = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    try {
      const imgRef = ref(imageDB, `KoiImages/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      // console.log("Uploaded file:", snapshot);

      const url = await getDownloadURL(snapshot.ref);
      setImgUrl((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset the file input
      }
    }
  };

  // Fetch existing images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesList = await listAll(ref(imageDB, "KoiImages"));
        const urls = await Promise.all(
          imagesList.items.map((item) => getDownloadURL(item))
        );
        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to trigger the file input dialog
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleUpload(selectedFile);
      // console.log("File selected for upload:", selectedFile.name);
    }
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick} className="input">
        Upload
      </button>
      <br />
      {imgUrl.map((dataVal, index) => (
        <div key={dataVal}>
          {/* <img src={dataVal} alt="error" /> */}
          <a
            href={dataVal}
            target="_blank"
            rel="noopener noreferrer" /*mở ảnh trong tab mới*/
          >
            link
          </a>
          <br />
        </div>
      ))}
    </div>
  );
};

export default UploadAnh;

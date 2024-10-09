import React from "react";
import { useEffect, useState, useRef } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "./ConfigUpload";

const UploadAnh = () => {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const fileInputRef = useRef(null); // Tạo ref cho ô input

  const handleUpload = () => {
    if (img !== null) {
      const imgRef = ref(imageDB, `KoiImages/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
        fileInputRef.current.value = null;
        setImg(""); // Cập nhật lại state img
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDB, "KoiImages")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);
  // console.log(imgUrl, "imgUrl");
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Kích hoạt input file khi nhấn nút
  };
  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          setImg(e.target.files[0]);
          handleUpload();
        }}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Upload</button>
      <br />
      {imgUrl.map((dataVal, index) => (
        <div key={dataVal}>
          <h4>{dataVal}</h4>
          <br />
        </div>
      ))}
    </div>
  );
};

export default UploadAnh;

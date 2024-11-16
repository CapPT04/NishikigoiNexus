import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handlePayCallBack,
  handleRechargePaymentCallBackApi,
} from "../../../axios/UserService";
import "./PaymentResponse.scss";
import Cookies from "js-cookie";

const PaymentResponse = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [requestId, setRequestId] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get("user"));

  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");

  const PayCallBack = async (info) => {
    // const res = await handlePayCallBack(info);
    const res = await handleRechargePaymentCallBackApi(info);
    // console.log(res);
    setResult(res);
  };
  useEffect(() => {
    const amount = parseInt(Cookies.get("amount"));
    sessionStorage.removeItem("amount");
    const info = {
      amount,
      vnp_Amount,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
    };
    // const match = vnp_OrderInfo.match(/Request (\d+)/);
    // setRequestId(match ? match[1] : null);
    // console.log(requestId);
    PayCallBack(info);
    setTimeout(() => setLoading(false), 5000);
  }, []);
  return (
    <div className="screen">
      {loading ? (
        <div className="waiting-screen">
          <div className="title-waiting">Pending payment...</div>
          <img
            src="https://cdn.dribbble.com/users/2077073/screenshots/7103423/media/223825c7f91575b639fd71f3accff8f4.gif"
            alt=""
          />
        </div>
      ) : result.status === 200 ? (
        <div className="success-screen">
          <div className="title-success">Payment Successful</div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nishikigoinexus-fa24.appspot.com/o/sp%2Ffree-check-icon-3278-thumb.png?alt=media&token=b040f1d3-b653-4108-8011-bb7f56bc7172"
            alt=""
          />
          {setTimeout(() => {
            if (user.Role === "1") {
              navigate("/User/UserWallet");
            } else {
              navigate("/Breeder/UserWallet");
            }
          }, 500)}
        </div>
      ) : (
        <div className="fail-screen">
          <div className="title-fail">Payment Failed</div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nishikigoinexus-fa24.appspot.com/o/sp%2Fgui-check-no-icon-512x512-9qqp1ph5.png?alt=media&token=3dcb26f5-9be9-4005-bcbb-cbbcbc94734a"
            alt=""
          />
          {setTimeout(() => {
            if (user.Role === "1") {
              navigate("/User/UserWallet");
            } else {
              navigate("/Breeder/UserWallet");
            }
          }, 500)}
        </div>
      )}
    </div>
  );
};

export default PaymentResponse;

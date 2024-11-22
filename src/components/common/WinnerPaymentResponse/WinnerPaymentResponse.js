import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handlePayCallBack,
  handleWinnerPaymentCallback,
  handleWinnerPaymentCallbackApi,
} from "../../../axios/UserService";
import "./WinnerPaymentRespones.scss";
import Cookies from "js-cookie";

const PaymentResponse = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const checkoutData = JSON.parse(Cookies.get("checkoutData"));

  const PayCallBack = async (info) => {
    const res = await handleWinnerPaymentCallbackApi(info, checkoutData);
    console.log(res);

    setResult(res);
  };
  useEffect(() => {
    const info = { vnp_Amount, vnp_OrderInfo, vnp_PayDate, vnp_ResponseCode };
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
          {setTimeout(() => navigate(`/User/UserBidHistory`), 500)}
        </div>
      ) : (
        <div className="fail-screen">
          <div className="title-fail">Payment Failed</div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nishikigoinexus-fa24.appspot.com/o/sp%2Fgui-check-no-icon-512x512-9qqp1ph5.png?alt=media&token=3dcb26f5-9be9-4005-bcbb-cbbcbc94734a"
            alt=""
          />
          {setTimeout(() => navigate(`/User/UserBidHistory`), 500)}
        </div>
      )}
    </div>
  );
};

export default PaymentResponse;

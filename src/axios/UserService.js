import axios from "axios";
import axiosClient from "./axiosClient";
import { useNavigate } from "react-router-dom";
const END_POINT = {
  LOGIN: "User/Login",
  SIGNUP: "User/MemberRegister",
  GETUSERBYID: "User/GetUserById",
  FEE: "Fee/GetFee",
  CREATEREQUEST: "Request/CreateRequest", //breeder
  GETALLREQUEST: "Request/GetAllRequest",
  LOGINWITHGOOGLE: "User/GoogleLogin",
  SHOWALLAUCTION: "Auction/GetAuctionsWithFishEntryCount"
};

export const handleLoginApi = (userEmail, userPassword) => {
  return axiosClient.post(`${END_POINT.LOGIN}`, {
    email: userEmail,
    password: userPassword,
  });
};

export const handleLoginWithGoogleApi = (token) => {
  return axiosClient.post(`${END_POINT.LOGINWITHGOOGLE}`, {
    token: token
  });
};

export const handleManageAuctionApi = () => {
  return axiosClient.get(`${END_POINT.SHOWALLAUCTION}`)
}

export const handleSignUpApi = async (user) => {
  try {
    const response = await axiosClient.post(`${END_POINT.SIGNUP}`, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
    // console.log("Signup successful:", response);
    return response;
  } catch (error) {
    // return error;
    // console.log("looi:", error);
  }
};

export const handleFeeApi = async () => {
  try {
    const res = await axiosClient.get(END_POINT.FEE);
    return res;
  } catch (error) {
    console.error("Lỗi khi gọi API FEE:", error);
    throw error; // Ném lỗi để các thành phần gọi hàm này có thể xử lý tiếp
  }
};

export const handleSubmitRequest = async (request) => {
  try {
    const response = await axiosClient.post(`${END_POINT.CREATEREQUEST}`, {
      token: sessionStorage.getItem("token"),
      fishName: request.fishName,
      shape: request.shape,
      size: request.size,
      origin: request.origin,
      age: request.age,
      weight: request.weight,
      gender: request.gender,
      pondAddress: request.pondAddress,
      pondCity: request.pondCity,
      imagePath: request.imagePath,
      note: request.note,
      fee: request.fee,
      auctionMethod: request.auctionMethod,
      minPrice: request.minPrice,
      maxPrice: request.maxPrice,
      increment: request.increment,
      expectedDate: request.expectedDate,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleGetAllRequest = async () => {
  try {
    return await axiosClient.get(END_POINT.GETALLREQUEST);
  } catch (error) {
    throw error;
  }
};

export const handleGetRequestDetail = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETREQUESTBYID}?requestId=${id}`);
  } catch (error) {
    throw error;
  }
};

export const handleGetFishEntry = async (id) => {
  try {
    return await axiosClient.get(
      `${END_POINT.GETFISHENTRYBYID}?requestId=${id}`
    );
  } catch (error) {
    throw error;
  }
};

export const handlePayFeeAPI = async (token, requestId) => {
  try {
    return await axiosClient.post(`${END_POINT.PAYFEE}`, {
      token: token,
      requestID: requestId,
    });
  } catch (error) {
    throw error;
  }
};

export const handlePayCallBack = async (info) => {
  try {
    return await axiosClient.post(`${END_POINT.PAYCALLBACK}`, {
      vnp_Amount: info.vnp_Amount,
      vnp_OrderInfo: info.vnp_OrderInfo,
      vnp_PayDate: info.vnp_PayDate,
      vnp_ResponseCode: info.vnp_ResponseCode,
    });
  } catch (error) {
    throw error;
  }
};

export const handleUserById = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETUSERBYID}?id=${id}`);
  } catch (error) {
    throw error;
  }
};

export const handleGetAllFish = async () => {
  try {
    return await axiosClient.get(END_POINT.GETALLFISH);
  } catch (error) {
    throw error;
  }
};

export const handleGetFishDetail = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETFISHDETAIL}?FishId=${id}`);
  } catch (error) {
    throw error;
  }
};

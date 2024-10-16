import axios from "axios";
import axiosClient from "./axiosClient";
import { useNavigate } from "react-router-dom";
const END_POINT = {
  LOGIN: "User/Login",
  SIGNUP: "User/MemberRegister",
  FEE: "Fee/GetFee",
  CREATEREQUEST: "Request/CreateRequest", //breeder
  GETALLREQUEST: "Request/GetAllRequest",
};

export const handleLoginApi = (userEmail, userPassword) => {
  return axiosClient.post(`${END_POINT.LOGIN}`, {
    email: userEmail,
    password: userPassword,
  });
};

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

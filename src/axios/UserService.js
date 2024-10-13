import axios from "axios";
import axiosClient from "./axiosClient";
const END_POINT = {
  LOGIN: "User/Login",
  SIGNUP: "User/MemberRegister",
  FEE: "Fee/GetFee",
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
    // console.log("Signup successful:");
    return response;
  } catch (error) {
    return error;
  }
};

export const handleFeeApi = async () => {
  try {
    const res = await axiosClient.get(END_POINT.FEE);
    return res;
  } catch (error) {
    console.error("Lỗi khi gọi API FEE:", error);
    // Bạn có thể tùy chỉnh cách xử lý lỗi ở đây
    throw error; // Ném lỗi để các thành phần gọi hàm này có thể xử lý tiếp
  }
};

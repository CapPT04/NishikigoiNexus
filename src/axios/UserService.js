import axios from "axios";
import axiosClient from "./axiosClient";
import { useNavigate } from "react-router-dom";
import CreateAuction from "../components/common/CreateAuction/CreateAuction";
const END_POINT = {
  LOGIN: "User/Login",
  SIGNUP: "User/MemberRegister",
  GETUSERBYID: "User/GetUserById",
  GETALLUSER: "User/GetAllUser",
  FEE: "Fee/GetFee",
  CREATEREQUEST: "Request/CreateRequest", //breeder
  GETALLREQUEST: "Request/GetAllRequest",
  LOGINWITHGOOGLE: "User/GoogleLogin",
  SHOWALLAUCTION: "Auction/GetAuctionsWithFishEntryCount",
  GETFISHIMAGESBYID: "Image/GetImageByFishId",
  CREATEAUCTION: "Auction/CreateAuction",
  GETALLBREEDERS: "Breeder/GetAllBreeders", //manager
  CREATEBREEDER: "Breeder/CreateBreeder",
  UPDATECOMMISSION: "Staff/UpdateBreederCommission",
  BANBREEDER: "Breeder/ToggleBreederStatus",
  GETFISHENTRYINAUCTION: "FishEntry/GetFishEntriesInAuction",
  //auction
  GETFISHENTRYBYID: "FishEntry/GetFishEntryById",
  PUBLICBIDHISTORY: "PublicBid/HistoryByFishEntryId",
  GETFISHENTRYINAUCTION: "FishEntry/GetFishEntriesInAuction",
  UPDATEAUCTIONDETAIL: "FishEntry/UpdateFishEntryDates",
  DELETEFISHENTRYINAUCTION: "FishEntry/DeleteFishEntry",
  GETFISHENTRYFORAUCTION: "FishEntry/GetFishEntriesForAuction",
  ADDFISHENTRYTOAUCTION: "Auction/AddFishEntryToAuction",
  GETPUBLICAUCTIONS: "Auction/GetPublicAuctionsWithFishEntryCount",
  PUBLICBIDDING: "PublicBid/PlaceBid",
};

export const handleLoginApi = (userEmail, userPassword) => {
  return axiosClient.post(`${END_POINT.LOGIN}`, {
    email: userEmail,
    password: userPassword,
  });
};

export const handleLoginWithGoogleApi = (token) => {
  return axiosClient.post(`${END_POINT.LOGINWITHGOOGLE}`, {
    token: token,
  });
};

export const handleManageAuctionApi = () => {
  return axiosClient.get(`${END_POINT.SHOWALLAUCTION}`);
};

export const handleGetFishEntryInAuction = (auctionId) => {
  try {
    return axiosClient.get(`${END_POINT.GETFISHENTRYINAUCTION}/${auctionId}`);
  } catch (error) { }
};

export const handleCreateAuctionApi = (token, auctionDate) => {
  try {
    return axiosClient.post(`${END_POINT.CREATEAUCTION}`, {
      token: token,
      startTime: auctionDate,
    });
  } catch (error) {
    throw error;
  }
};

export const handleUpdateAuctionDetailApi = (
  fishEntryId,
  startTime,
  finishTime
) => {
  try {
    return axiosClient.put(`${END_POINT.UPDATEAUCTIONDETAIL}`, {
      fishEntryId: fishEntryId,
      startdate: startTime,
      enddate: finishTime,
    });
  } catch (error) {
    throw error;
  }
};

export const handleDeleteFishEntryInAuctionApi = (auctionID, fishEntryID) => {
  try {
    return axiosClient.put(`${END_POINT.DELETEFISHENTRYINAUCTION}`, {
      auctionId: auctionID,
      fishentryId: fishEntryID,
    });
  } catch (error) {
    throw error;
  }
};

export const handleGetFishEntryForAuctionApi = () => {
  try {
    return axiosClient.get(`${END_POINT.GETFISHENTRYFORAUCTION}`);
  } catch (error) {
    throw error;
  }
};
export const handleAddFishEntryForAuctionApi = (
  fishEntryId,
  auctionId,
  token
) => {
  try {
    return axiosClient.post(`${END_POINT.ADDFISHENTRYTOAUCTION}`, {
      fishEntryId: fishEntryId,
      auctionId: auctionId,
      token: token,
    });
  } catch (error) {
    throw error;
  }
}

export const handleGetPublicAuctionsApi = () => {
  try {
    return axiosClient.get(`${END_POINT.GETPUBLICAUCTIONS}`);
  } catch (error) {
    throw error;
  }
}



export const handleGetAllBreeders = () => {
  try {
    return axiosClient.get(`${END_POINT.GETALLBREEDERS}`);
  } catch (error) {
    throw error;
  }
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

export const handleGetFishDetailById = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETFISHDETAIL}?FishId=${id}`);
  } catch (error) {
    throw error;
  }
};

export const handleGetFishImgById = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETFISHIMAGESBYID}?FishId=${id}`);
  } catch (error) {
    throw error;
  }
};

export const handleCreateBreeder = async (token, breeder) => {
  try {
    return await axiosClient.post(`${END_POINT.CREATEBREEDER}`, {
      token: token,
      email: breeder.email,
      firstName: breeder.firstName,
      lastName: breeder.lastName,
      password: breeder.password,
      address: breeder.address,
      city: breeder.city,
      phone: breeder.phone,
      gender: 1,
      commission: breeder.commission,
    });
  } catch (error) {
    throw error;
  }
};

export const handleToggleBreederStatus = async (token, id, reason) => {
  try {
    return await axiosClient.put(`${END_POINT.BANBREEDER}?id=${id}`, {
      token: token,
      reason: reason,
    });
  } catch (error) {
    throw error;
  }
};

export const handleUpdateBreederCommission = async (
  token,
  id,
  newCommission
) => {
  try {
    return await axiosClient.put(
      `${END_POINT.UPDATECOMMISSION}?id=${id}&token=${token}&commission=${newCommission}`
    );
  } catch (error) {
    throw error;
  }
};

export const handleGetAllUser = async () => {
  try {
    return await axiosClient.get(`${END_POINT.GETALLUSER}`);
  } catch (error) {
    throw error;
  }
};
export const handleFishEntryById = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.GETFISHENTRYBYID}/${id}`);
  } catch (error) {
    throw error;
  }
};
export const handleBidHistory = async (id) => {
  try {
    return await axiosClient.post(
      `${END_POINT.PUBLICBIDHISTORY}?FishEntryId=${id}`
    );
  } catch (error) {
    throw error;
  }
};

export const handlePublicBidding = async (token, entryId, amount) => {
  try {
    return await axiosClient.post(`${END_POINT.PUBLICBIDDING}`, {
      token: token,
      fishEntryId: entryId,
      amount: amount,
    });
  } catch (error) {
    throw error;
  }
};

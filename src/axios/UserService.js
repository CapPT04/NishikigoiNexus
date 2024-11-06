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
  //breeder
  CREATEREQUEST: "Request/CreateRequest",
  GETALLREQUEST: "Request/GetAllRequest",
  LOGINWITHGOOGLE: "User/GoogleLogin",
  SHOWALLAUCTION: "Auction/GetAuctionsWithFishEntryCount",
  GETFISHIMAGESBYID: "Image/GetImageByFishId",
  CREATEAUCTION: "Auction/CreateAuction",
  GETREQUESTBYID: "Request/GetRequestById",
  GETFISHDETAIL: "Fish/GetFishById",
  GETALLBREEDERS: "Breeder/GetAllBreeders",
  //manager
  CREATEBREEDER: "Breeder/CreateBreeder",
  UPDATECOMMISSION: "Staff/UpdateBreederCommission",
  BANBREEDER: "Breeder/ToggleBreederStatus",
  GETFISHENTRYINAUCTION: "FishEntry/GetFishEntriesInAuction",
  GETALLMEMBER: "User/GetAllMember",
  BANUSER: "User/ToggleMemAndBreedStatus",
  USERBIDHISTORY: "User/GetBiddingHistoryByMemberId",
  GETFISHENTRYBYREQUESTID: "FishEntry/GetFishEntriesByRequestId",
  GETFISHBYFISHENTRYID: "Fish/GetFishByFishEntryId",
  ACCEPTREQUEST: "Request/CheckRequest",
  CANCELREQUEST: "Request/CancelRequest",
  GETALLFISH: "Fish/GetAllFish",
  GETALLFISHENTRY: "FishEntry/GetAllFishEntries",
  PAYFEE: "Payment/FeePayment",
  PAYCALLBACK: "Payment/PaymentCallBack",
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
  GETAUCTIONDETAILBYID: "Auction/GetAuctionDetailsById",
  FIXEDPRICEHISTORY: "FixedPriceSale/HistoryByFishEntryId",
  PLACEFIXEDPRICE: "FixedPriceSale/PlaceBid",
  GETHISTORYOFSECRETBID: "SecretBid/HistoryOfSecretBidByFishEntryId",
  PUBLICAUCTION: "Auction/UpdateAuctionStatus",
  PLACESECRETBID: "SecretBid/PlaceSecretBid",
  PLACEDUCTHAUCTIONBID: "FishEntry/PlaceDutchAuctionBid",
  FISHENTRYDASHBOARD: "FishEntry/FishEntryDashboard",
  COUNTNEWMEMBER: "User/CountNewMembers",
  REVENUEBYTIMEFRAME: "Payment/RevenueByTimeFrame",
  MONTHLYREVENUE: "Payment/MonthlyRevenueCurrentYear",
  GETWINNER: "FishEntry/GetWinner",
  GETOTHERBIDDINGHISTORYBYMEMBERID: "User/GetOtherBiddingHistoryByMemberId",
  GETBIDDINGHISTORYBYMEMBERID: "User/GetBiddingHistoryByMemberId",
  GETUNPAIDBIDDINGHISTORYBYMEMBERID: "User/GetUnpaidBiddingHistoryByMemberId",
  WINNERPAYMENT: "Payment/WinnerPayment",
  WINNERPAYMENTCALLBACK: "Payment/WinnerPaymentCallBack",
  CHECKENROLL: "Enrollment/CheckEnrollment",
  ENROLL: "Enrollment/Enroll",

  //user
  GETBALANCEBYUSERID: "User/GetBalanceByUserId",
  RECHARGEPAYMENT: "Payment/RechargePayment",
  RECHARGEPAYMENTCALLBACK: "Payment/RechargePaymentCallBack",
  TRANSACTIONHISTORY: "Transaction/GetTransactionHistory",
  //Payment
  WALLETPAYMENT: "Payment/WalletPayment",
};
export const handleWalletPaymentApi = (token, amount) => {
  return axiosClient.post(`${END_POINT.WALLETPAYMENT}`, {
    token: token,
    amount: amount,
  });
};
export const handleBalanceByUserIdApi = (userId) => {
  return axiosClient.get(`${END_POINT.GETBALANCEBYUSERID}?id=${userId}`);
};
export const handleRechargePaymentApi = (token, amount) => {
  return axiosClient.post(`${END_POINT.RECHARGEPAYMENT}`, {
    token: token,
    amount: amount,
  });
};
export const handleRechargePaymentCallBackApi = (object) => {
  return axiosClient.post(`${END_POINT.RECHARGEPAYMENTCALLBACK}`, {
    amount: object.amount,
    vnp_Amount: object.vnp_Amount,
    vnp_OrderInfo: object.vnp_OrderInfo,
    vnp_PayDate: object.vnp_PayDate,
    vnp_ResponseCode: object.vnp_ResponseCode,
  });
};
export const handleTransactionHistoryApi = (token) => {
  return axiosClient.post(`${END_POINT.TRANSACTIONHISTORY}?token=${token}`);
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
  } catch (error) {}
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
};

export const handleGetPublicAuctionsApi = () => {
  try {
    return axiosClient.get(`${END_POINT.GETPUBLICAUCTIONS}`);
  } catch (error) {
    throw error;
  }
};

export const handleGetAuctionDetailByIdApi = async (auctionId) => {
  try {
    return axiosClient.get(`${END_POINT.GETAUCTIONDETAILBYID}`, {
      params: { auctionid: auctionId },
    });
  } catch (error) {
    throw error; // Re-throw the error to be handled in the component
  }
};

export const handleGetHistoryOfSecretBidApi = async (FishEntryId) => {
  try {
    return axiosClient.post(
      `${END_POINT.GETHISTORYOFSECRETBID}?FishEntryId=${FishEntryId}`
    );
  } catch (error) {
    throw error;
  }
};

export const handlePublicAuctionApi = async (auctionId) => {
  try {
    // Use auctionId directly in the URL
    return await axiosClient.put(`${END_POINT.PUBLICAUCTION}/${auctionId}`);
  } catch (error) {
    throw error; // Re-throw the error to be handled in the component
  }
};

export const handlePlaceSecretBidApi = async (token, amount, fishEntryId) => {
  try {
    // Use auctionId directly in the URL
    return await axiosClient.post(`${END_POINT.PLACESECRETBID}`, {
      token: token,
      amount: amount,
      fishEntryId: fishEntryId,
    });
  } catch (error) {
    throw error; // Re-throw the error to be handled in the component
  }
};

export const handlePlaceDutchAuctionBid = (token, fishEntryID) => {
  try {
    const url = `${END_POINT.PLACEDUCTHAUCTIONBID}?token=${token}&fishEntryId=${fishEntryID}`;
    return axiosClient.put(url);
  } catch (error) {
    throw error;
  }
};
export const handleFishEntryDashBoardApi = async () => {
  try {
    return await axiosClient.get(`${END_POINT.FISHENTRYDASHBOARD}`);
  } catch (error) {
    throw error;
  }
};

export const handleCountNewMemberApi = async (timeFrame) => {
  try {
    const response = await axiosClient.get(`${END_POINT.COUNTNEWMEMBER}`, {
      params: { timeFrame },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching new member count:", error);
    throw error;
  }
};

export const handleRevenueByTimeFrame = async (timeFrame) => {
  try {
    const response = await axiosClient.get(`${END_POINT.REVENUEBYTIMEFRAME}`, {
      params: { timeFrame },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleMonthlyRevenueApi = async () => {
  try {
    return axiosClient.get(`${END_POINT.MONTHLYREVENUE}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetWinnerApi = async (fishEntryId) => {
  try {
    return axiosClient.get(`${END_POINT.GETWINNER}`, {
      params: { fishEntryId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const handleGetBiddingHistoryByMemberIdApi = async (id) => {
  try {
    return axiosClient.get(`${END_POINT.GETBIDDINGHISTORYBYMEMBERID}`, {
      params: { id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleGetUnpaidBiddingHistoryByMemberIdApi = async (id) => {
  try {
    return axiosClient.get(`${END_POINT.GETUNPAIDBIDDINGHISTORYBYMEMBERID}`, {
      params: { id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleWinnerPaymentApi = async (token, fishEntryId) => {
  try {
    return await axiosClient.post(`${END_POINT.WINNERPAYMENT}`, {
      token: token,
      fishEntryId: fishEntryId,
    });
  } catch (error) {
    throw error;
  }
};

export const handleWinnerPaymentCallbackApi = async (info, checkoutData) => {
  try {
    return await axiosClient.post(`${END_POINT.WINNERPAYMENTCALLBACK}`, {
      vnp_Amount: info.vnp_Amount,
      vnp_OrderInfo: info.vnp_OrderInfo,
      vnp_PayDate: info.vnp_PayDate,
      vnp_ResponseCode: info.vnp_ResponseCode,
      phone: checkoutData.phone,
      address: checkoutData.address,
      city: checkoutData.city,
    });
  } catch (error) {
    throw error;
  }
};


export const handleCheckEnrollApi = async (token, fishEntryId) => {
  try {
    return await axiosClient.post(`${END_POINT.CHECKENROLL}`, {
      token: token,
      fishEntryId: fishEntryId
    });
  } catch (error) {
    throw error;
  }
};

export const handleEnrollApi = async (token, fishEntryId) => {
  try {
    return await axiosClient.post(`${END_POINT.ENROLL}`, {
      token: token,
      fishEntryId: fishEntryId
    });
  } catch (error) {
    throw error;
  }
};

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

export const handleGetFishEntryByRequestId = async (id) => {
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
export const handleGetAllMember = async () => {
  try {
    return await axiosClient.get(`${END_POINT.GETALLMEMBER}`);
  } catch (error) {
    throw error;
  }
};
export const handleToggleUserStatus = async (token, id, reason) => {
  try {
    return await axiosClient.put(`${END_POINT.BANUSER}?id=${id}`, {
      token: token,
      reason: reason,
    });
  } catch (error) {
    throw error;
  }
};
export const handleUserBidHistory = async (id) => {
  try {
    return await axiosClient.get(`${END_POINT.USERBIDHISTORY}?id=${id}`);
  } catch (error) {
    throw error;
  }
};
export const handleFishEntryByRequestId = async (request_id) => {
  try {
    return await axiosClient.get(
      `${END_POINT.GETFISHENTRYBYREQUESTID}?requestId=${request_id}`
    );
  } catch (error) {
    throw error;
  }
};
export const handleFishByFishEntryId = async (fishEntryId) => {
  try {
    return await axiosClient.get(
      `${END_POINT.GETFISHBYFISHENTRYID}?FishEntryId=${fishEntryId}`
    );
  } catch (error) {
    throw error;
  }
};
export const handleAcceptRequest = async (token, requestId, deliveryCost) => {
  try {
    return await axiosClient.put(`${END_POINT.ACCEPTREQUEST}`, {
      token: token,
      requestId: requestId,
      deliveryCost: deliveryCost,
    });
  } catch (error) {
    throw error;
  }
};
export const handleCancelRequest = async (token, requestId, reason) => {
  try {
    const res = await axiosClient.delete(`${END_POINT.CANCELREQUEST}`, {
      data: {
        token: token,
        requestId: requestId,
        reason: reason,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
export const handleAllFishEntry = async () => {
  try {
    return await axiosClient.get(`${END_POINT.GETALLFISHENTRY}`);
  } catch (error) {
    throw error;
  }
};
export const handleFixedPriceHistory = async (fishEntryId) => {
  try {
    return await axiosClient.post(
      `${END_POINT.FIXEDPRICEHISTORY}?FishEntryId=${fishEntryId}`
    );
  } catch (error) {
    throw error;
  }
};
export const handlePlaceFixedPrice = async (token, fishEntryId) => {
  try {
    return await axiosClient.post(`${END_POINT.PLACEFIXEDPRICE}`, {
      token: token,
      fishEntryId: fishEntryId,
    });
  } catch (error) {
    throw error;
  }
};

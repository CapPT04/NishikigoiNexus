import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";
import Cookies from "js-cookie";
//breeder
const Breeder = React.lazy(() => import("../route/BreederRoute"));
const CreateRequest = React.lazy(() =>
  import("../components/breeder/request/Request")
);
const HistoryRequest = React.lazy(() =>
  import("../components/breeder/history/History")
);
const DetailRequest = React.lazy(() =>
  import("../components/breeder/requestDetail/RequestDetail")
);
const FishList = React.lazy(() =>
  import("../components/breeder/fish/FishList")
);
const DetailFish = React.lazy(() =>
  import("../components/breeder/fishDetail/FishDetail")
);
const ManageAuction = React.lazy(() =>
  import("../components/manage/ManageAuction")
);
const CreateAuction = React.lazy(() =>
  import("../components/common/CreateAuction/CreateAuction")
);
const AuctionDetail = React.lazy(() =>
  import("../components/manage/AuctionDetail")
);
const ManageKoi = React.lazy(() =>
  import("../components/manage/manageKoi/ManageKoi")
);
const KoiDetail = React.lazy(() =>
  import("../components/manage/koiDetail/KoiDetail")
);

//staff
const Staff = React.lazy(() => import("../route/StaffRoute"));
const Manage = React.lazy(() => import("../components/manage/ManageMember"));
const UserDetail = React.lazy(() =>
  import("../components/manage/userDetail/UserDetail")
);
const ManageBreeder = React.lazy(() =>
  import("../components/manage/manageBreeder/ManageBreeder")
);
const BreederDetail = React.lazy(() =>
  import("../components/manage/breederDetail/BreederDetail")
);
const CreateBreeder = React.lazy(() =>
  import("../components/manage/createBreeder/CreateBreeder")
);
const ManageRequest = React.lazy(() =>
  import("../components/manage/manageRequest/ManageRequest")
);
const RequestDetail = React.lazy(() =>
  import("../components/manage/requestDetail/RequestDetail")
);
const AuctionScreen = React.lazy(() =>
  import("../components/public/AuctionScreen/AuctionScreen")
);
const ManageFishEntry = React.lazy(() =>
  import("../components/manage/manageFishEntry/ManageFishEntry")
);
const FishEntryDetail = React.lazy(() =>
  import("../components/manage/fishEntryDetail/FishEntryDetail")
);
// const MemberBidHistory = React.lazy(() =>
//   import("../components/member/memberHistory/MemberHistory")
// );
const UserBidHistory = React.lazy(() =>
  import("../components/user/UserBidHistory")
);
const DashBoard = React.lazy(() =>
  import("../components/manage/dashboard/Dashboard")
);
const CreateStaff = React.lazy(() =>
  import("../components/manage/createStaff/CreateStaff")
);
const ManageStaff = React.lazy(() =>
  import("../components/manage/manageStaff/ManageStaff")
);
const ManageDelivery = React.lazy(() =>
  import("../components/manage/manageDelivery/ManageDelivery")
);
const DeliveryDetail = React.lazy(() =>
  import("../components/manage/deliveryDetail/DeliveryDetail")
);

//user
const User = React.lazy(() => import("../route/UserRoute"));
const Checkout = React.lazy(() => import("../components/user/Checkout"));
const WinnerPaymentCallback = React.lazy(() =>
  import("../components/common/WinnerPaymentResponse/WinnerPaymentResponse")
);
const UserWallet = React.lazy(() =>
  import("../components/user/wallet/UserWallet")
);
//payment
const Payment = React.lazy(() => import("../route/PaymentRoute"));
const PaymentResponse = React.lazy(() =>
  import("../components/common/PaymentResponse/PaymentResponse")
);

// Private routes definition
const PrivateRoutes = [
  // Breeder routes
  {
    path: path.BREEDER,
    element: <LoadLazy children={<Breeder />} />,
    children: [
      {
        path: path.CREATEREQUEST,
        element: <LoadLazy children={<CreateRequest />} />,
      },
      {
        path: path.HISTORYREQUEST,
        element: <LoadLazy children={<HistoryRequest />} />,
      },
      {
        path: path.DETAILREQUEST,
        element: <LoadLazy children={<DetailRequest />} />,
      },
      {
        path: path.PAYMENTRESPONSE,
        element: <LoadLazy children={<PaymentResponse />} />,
      },
      { path: path.FISHLIST, element: <LoadLazy children={<FishList />} /> },
      {
        path: path.DETAILFISH,
        element: <LoadLazy children={<DetailFish />} />,
      },
      {
        path: path.USERWALLET,
        element: <LoadLazy children={<UserWallet />} />,
      },
    ],
  },

  // Staff routes
  {
    path: path.MANAGER,
    element: <LoadLazy children={<Staff />} />,
    children: [
      { path: path.MANAGE, element: <LoadLazy children={<Manage />} /> },
      {
        path: path.MANAGEDELIVERY,
        element: <LoadLazy children={<ManageDelivery />} />,
      },
      {
        path: path.DELIVERYDETAIL,
        element: <LoadLazy children={<DeliveryDetail />} />,
      },
      {
        path: path.MANAGEAUCTION,
        element: <LoadLazy children={<ManageAuction />} />,
      },
      {
        path: path.CREATEAUCTION,
        element: <LoadLazy children={<CreateAuction />} />,
      },
      {
        path: path.MANAGEBREEDER,
        element: <LoadLazy children={<ManageBreeder />} />,
      },
      {
        path: path.AUCTIONDETAIL,
        element: <LoadLazy children={<AuctionDetail />} />,
      },
      {
        path: path.BREEDERDETAIL,
        element: <LoadLazy children={<BreederDetail />} />,
      },
      {
        path: path.CREATEBREEDER,
        element: <LoadLazy children={<CreateBreeder />} />,
      },
      {
        path: path.USERDETAIL,
        element: <LoadLazy children={<UserDetail />} />,
      },
      {
        path: path.MANAGEREQUEST,
        element: <LoadLazy children={<ManageRequest />} />,
      },
      {
        path: path.REQUESTDETAIL,
        element: <LoadLazy children={<RequestDetail />} />,
      },
      { path: path.MANAGEKOI, element: <LoadLazy children={<ManageKoi />} /> },
      { path: path.KOIDETAIL, element: <LoadLazy children={<KoiDetail />} /> },
      {
        path: path.MANAGEFISHENTRY,
        element: <LoadLazy children={<ManageFishEntry />} />,
      },
      {
        path: path.FISHENTRYDETAIL,
        element: <LoadLazy children={<FishEntryDetail />} />,
      },
      { path: path.DASHBOARD, element: <LoadLazy children={<DashBoard />} /> },
      {
        path: path.CREATESTAFF,
        element: <LoadLazy children={<CreateStaff />} />,
      },
      {
        path: path.MANAGESTAFF,
        element: <LoadLazy children={<ManageStaff />} />,
      },
      {
        path: path.USERWALLET,
        element: <LoadLazy children={<UserWallet />} />,
      },
    ],
  },

  // Member routes
  // {
  //   path: path.MEMBERBIDHISTORY,
  //   element: <LoadLazy children={<MemberBidHistory />} />,
  // },

  // User routes
  {
    path: path.USER,
    element: <LoadLazy children={<User />} />,
    children: [
      {
        path: path.USERBIDHISTORY,
        element: <LoadLazy children={<UserBidHistory />} />,
      },
      { path: path.CHECKOUT, element: <LoadLazy children={<Checkout />} /> },
      {
        path: path.WINNERPAYMENTCALLBACK,
        element: <LoadLazy children={<WinnerPaymentCallback />} />,
      },
      {
        path: path.USERWALLET,
        element: <LoadLazy children={<UserWallet />} />,
      },
    ],
  },
  // Payment
  {
    path: path.PAYMENT,
    element: <LoadLazy children={<Payment />} />,
    children: [
      {
        path: path.PAYMENTRESPONSE,
        element: <LoadLazy children={<PaymentResponse />} />,
      },
    ],
  },

  // Fallback route
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PrivateRoutes;

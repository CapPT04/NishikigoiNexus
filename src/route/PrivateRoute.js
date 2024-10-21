import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

//breeder
const Breeder = React.lazy(() => import("../route/BreederRoute"));
const CreateRequest = React.lazy(() =>
  import("../components/breeder/request/Request")
);
const HistoryRequest = React.lazy(() =>
  import("../components/breeder/history/History")
);
const DetailRequest = React.lazy(() =>
  import("../components/breeder/requestDetaiil/RequestDetail")
);
const PaymentResponse = React.lazy(() =>
  import("../components/common/PaymentResponse/PaymentResponse")
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
//staff
const Staff = React.lazy(() => import("../route/StaffRoute"));
const Manage = React.lazy(() => import("../components/manage/ManageMember"));
const ManageBreeder = React.lazy(() =>
  import("../components/manage/manageBreeder/ManageBreeder")
);
const BreederDetail = React.lazy(() =>
  import("../components/manage/breederDetail/BreederDetail")
);
const CreateBreeder = React.lazy(() =>
  import("../components/manage/createBreeder/CreateBreeder")
);

const PrivateRoutes = [
  //breeder
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
      {
        path: path.FISHLIST,
        element: <LoadLazy children={<FishList />} />,
      },
      {
        path: path.DETAILFISH,
        element: <LoadLazy children={<DetailFish />} />,
      },
    ],
  },

  //staff
  {
    path: path.MANAGER,
    element: <LoadLazy children={<Staff />} />,
    children: [
      {
        //quan ly member
        path: path.MANAGE,
        element: <LoadLazy children={<Manage />} />,
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
        element: <LoadLazy children={<AuctionDetail />} />
      },
      {
        path: path.BREEDERDETAIL,
        element: <LoadLazy children={<BreederDetail />} />,
      },
      {
        path: path.CREATEBREEDER,
        element: <LoadLazy children={<CreateBreeder />} />,
      },
    ],
  },

  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PrivateRoutes;

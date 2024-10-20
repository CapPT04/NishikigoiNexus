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
//staff
const Staff = React.lazy(() => import("../route/StaffRoute"));
const Manage = React.lazy(() => import("../components/manage/ManageMember"));

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
        path: path.MANAGE,
        element: <LoadLazy children={<Manage />} />,
      },
    ],
  },
<<<<<<< HEAD
=======
  {
    path: path.DETAILREQUEST,
    element: <LoadLazy children={<DetailRequest />} />,
  },
  {
    path: path.MANAGE,
    element: <LoadLazy children={<Manage />} />,
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
  {
    path: path.MANAGEAUCTION,
    element: <LoadLazy children={<ManageAuction />} />,
  },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
>>>>>>> be2bcb6d61c0717a7cd1a63bbd060893933df47a
];

export default PrivateRoutes;

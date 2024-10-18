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
];

export default PrivateRoutes;

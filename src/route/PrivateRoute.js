import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

//breeder
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
const Manage = React.lazy(() => import("../components/manage/ManageMember"));

const PublicRoutes = [
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
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

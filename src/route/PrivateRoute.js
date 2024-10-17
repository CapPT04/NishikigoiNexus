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
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

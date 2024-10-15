import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const CreateRequest = React.lazy(() =>
  import("../components/breeder/request/Request")
);
const HistoryRequest = React.lazy(() =>
  import("../components/breeder/history/History")
);
const Manage = React.lazy(() =>
  import("../components/manage/ManageMember")
);

const PublicRoutes = [
  {
    path: path.CREATEREQUEST,
    element: <LoadLazy children={<CreateRequest />} />,
  },
  {
    path: path.HISTORYREQUEST,
    element: <LoadLazy children={<HistoryRequest />} />,
  }, {

    path: path.MANAGE,
    element: <LoadLazy children={<Manage />} />,
  },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

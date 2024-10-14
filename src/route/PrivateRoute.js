import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const CreateRequest = React.lazy(() =>
  import("../components/breeder/request/Request")
);

const PublicRoutes = [
  {
    path: path.CREATEREQUEST,
    element: <LoadLazy children={<CreateRequest />} />,
  },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const Home = React.lazy(() => import("../components/public/HomePage/HomePage"));
const Login = React.lazy(() => import("../components/LoginPage"));

const PublicRoutes = [
  { path: path.HOME, element: <LoadLazy children={<Home />} /> },
  { path: path.LOGIN, element: <LoadLazy children={<Login />} /> },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

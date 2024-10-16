import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const Home = React.lazy(() => import("../components/public/HomePage/HomePage"));
const Login = React.lazy(() => import("../components/LoginPage"));
const Signup = React.lazy(() =>
  import("../components/public/SignupPage/SignupPage")
);

const PublicRoutes = [
  // { path: path.HOME, element: <LoadLazy children={<Home />} /> },
  { path: path.HOME, element: <Home /> },
  { path: path.LOGIN, element: <LoadLazy children={<Login />} /> },
  { path: path.SIGNUP, element: <LoadLazy children={<Signup />} /> },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

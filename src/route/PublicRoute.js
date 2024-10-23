import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const Home = React.lazy(() => import("../components/public/HomePage/HomePage"));
const Login = React.lazy(() => import("../components/LoginPage"));
const Signup = React.lazy(() =>
  import("../components/public/SignupPage/SignupPage")
);
const AuctionScreen = React.lazy(() => import("../components/public/AuctionScreen/AuctionScreen"));
const AuctionScreenDetail = React.lazy(() => import("../components/public/AuctionScreenDetail/AuctionScreenDetail"));
const AuctionPage = React.lazy(() =>
  import("../components/auctionScreen/method3/FishAuctionMethod3")
);

const PublicRoutes = [
  // { path: path.HOME, element: <LoadLazy children={<Home />} /> },
  { path: path.HOME, element: <Home /> },
  { path: path.AUCTION, element: <AuctionScreen /> },
  { path: path.AUCTIONSCREENDETAIL, element: <AuctionScreenDetail /> },
  { path: path.SIGNUP, element: <LoadLazy children={<Signup />} /> },
  {
    path: path.AUCTIONMETHOD,
    element: <LoadLazy children={<AuctionPage />} />,
  },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

import { path } from "./Path";
import React from "react";
import LoadLazy from "./LoadLazy";
import NotFound from "../components/common/NotFound";

const Home = React.lazy(() => import("../components/public/HomePage/HomePage"));
const Login = React.lazy(() => import("../components/LoginPage"));
const Signup = React.lazy(() =>
  import("../components/public/SignupPage/SignupPage")
);
const AuctionScreen = React.lazy(() =>
  import("../components/public/AuctionScreen/AuctionScreen")
);
const AuctionScreenDetail = React.lazy(() =>
  import("../components/public/AuctionScreenDetail/AuctionScreenDetail")
);
const FishAuctionMethod3 = React.lazy(() =>
  import("../components/auctionScreen/method3/FishAuctionMethod3")
);
const FishAuctionMethod2 = React.lazy(() =>
  import("../components/auctionScreen/method2/FishAuctionMethod2")
);
const FishAuctionMethod1 = React.lazy(() =>
  import("../components/auctionScreen/method1/FishAuctionMethod1")
);

const FishAuctionMethod4 = React.lazy(() =>
  import("../components/auctionScreen/method4/FishAuctionMethod4")
);
const PublicRoutes = [
  // { path: path.HOME, element: <LoadLazy children={<Home />} /> },
  { path: path.LOGIN, element: <Login /> },
  { path: path.HOME, element: <Home /> },
  { path: path.AUCTION, element: <AuctionScreen /> },
  { path: path.AUCTIONSCREENDETAIL, element: <AuctionScreenDetail /> },
  { path: path.LOGIN, element: <LoadLazy children={<Login />} /> },
  { path: path.SIGNUP, element: <LoadLazy children={<Signup />} /> },
  {
    path: path.AUCTIONMETHOD2,
    element: <LoadLazy children={<FishAuctionMethod2 />} />,
  },
  {
    path: path.AUCTIONMETHOD3,
    element: <LoadLazy children={<FishAuctionMethod3 />} />,
  },
  {
    path: path.AUCTIONMETHOD1,
    element: <LoadLazy children={<FishAuctionMethod1 />} />,
  },
  {
    path: path.AUCTIONMETHOD4,
    element: <LoadLazy children={<FishAuctionMethod4 />} />,
  },
  { path: "*", element: <LoadLazy children={<NotFound />} /> },
];

export default PublicRoutes;

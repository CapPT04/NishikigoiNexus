import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./route/CombineRoutes.js";
import Request from "./components/breeder/request/Request.js";
import History from "./components/breeder/history/History.js";
import ManageMember from "./components/manage/ManageMember.js";
import LoginPage from "./components/LoginPage.js"
import VerticallyNavbar from "./components/common/Navbar/VerticallyNavbar.js"

function App() {
  return (
    <div className="App">
      {/* <VerticallyNavbar></VerticallyNavbar> */}
      {/* <HomePage></HomePage> */}
      <Suspense
        fallback={
          <div className="fixed flex justify-center items-center text-9xl top-0 bottom-0 left-0 right-0">
            Loading...
          </div>
        }
      >
        <RouterProvider router={routes}></RouterProvider>

      </Suspense>
      {/* <Request></Request> */}
      {/* <History></History> */}
      {/* <ManageMember></ManageMember> */}


    </div>
  );
}

export default App;

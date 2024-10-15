import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./route/CombineRoutes.js";
import Request from "./components/breeder/request/Request.js";
import History from "./components/breeder/history/History.js";

function App() {
  return (
    <div className="App">
      {/* <HomePage></HomePage> */}
      <RouterProvider router={routes}></RouterProvider>
      {/* <Request></Request> */}
      {/* <History></History> */}
    </div>
  );
}

export default App;

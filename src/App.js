import React from "react";
// import "./App.css";
// import LoginPage from "./components/LoginPage";
import HomePage from "./components/public/HomePage/HomePage";
import { RouterProvider } from "react-router-dom";
import routes from "./route/CombineRoutes.js";
import UploadAnh from "./upload/UploadAnh.js";

function App() {
  return (
    <div className="App">
      {/* <HomePage></HomePage> */}
      <RouterProvider router={routes}></RouterProvider>
      {/* <UploadAnh></UploadAnh> */}
    </div>
  );
}

export default App;

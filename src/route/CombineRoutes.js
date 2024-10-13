import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([...PublicRoute, ...PrivateRoute]);

export default routes;

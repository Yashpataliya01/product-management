import { createBrowserRouter } from "react-router-dom";
import dashboardRoute from "./DashboardRoute.jsx";
import userOnboardRoute from "./UserOnboardRoute.jsx";
import customerRoute from "./CustomerRoute.jsx";

export const createAppRouter  = ()=> createBrowserRouter(
    [
        ...dashboardRoute(),
        ...userOnboardRoute(),
        ...customerRoute(),

    ]
)


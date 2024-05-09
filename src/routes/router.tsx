import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "../pages/Root/RootPage";
import { Error } from "../pages/Root/Error";
import { HomePage } from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            }
        ]
    }
])
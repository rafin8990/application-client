import { createBrowserRouter } from "react-router-dom";
import Application from "../Pages/Application/Application";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Login></Login>
    },
    {
        path:'/home',
        element:<Home></Home>
    },
    {
        path:'/application',
        element:<Application></Application>
    }
])
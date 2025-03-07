import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/ChildComponents/Home";
import Signup from "./components/Authentication/Signup";
import Signin from "./components/Authentication/Signin";
import Teacher from "./components/ChildComponents/Teacher/Teacher";
import Today from "./components/ChildComponents/Home route/Today";
import Last7day from "./components/ChildComponents/Home route/Last7day";
import DynamicStudent from "./components/ChildComponents/DynamicStudent";
import Protection from "./components/ChildComponents/Protection";

export const route=createBrowserRouter([
    {
        path:"/",
        element:<Protection><Root></Root></Protection>,
        children:[
            {
                path:"/",
                element:<Home></Home>,
                children:[
                    {
                        path:"/",
                        element:<Today></Today>
                    },
                    {
                        path:"/lastweek",
                        element:<Last7day></Last7day>
                    }
                ]
            },
            {
                path:"/login",
                element:<Signin></Signin>
            },
            {
                path:"/register",
                element:<Signup></Signup>
            }
        ]
    },
    {
        path:"/teacher",
        element:<Teacher></Teacher>
    },
    {
        path:"/teacher/:id",
        element:<DynamicStudent></DynamicStudent>
    }
])
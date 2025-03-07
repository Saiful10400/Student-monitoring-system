import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { route } from "./Routes";
import ContextProvider from "./components/ContextApi/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <ContextProvider>
    <RouterProvider router={route}></RouterProvider>
  </ContextProvider>
);

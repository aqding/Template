import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import TestPage from "./TestPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "testpath",
        element: <TestPage />,
      },
    ],
    errorElement: <div>Whoops! This can't be found!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  <RouterProvider router={router} />
);

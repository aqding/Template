import React, { useEffect } from "react";
import { get, post, patch, put, del } from "./utilities";
import TestPage from "./TestPage";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const App = () => {
  useEffect(() => {
    console.log("Hello");
    get("/api/user/session").then((res) => console.log(res));
  });
  return (
    <div>
      This is our app!{" "}
      <Link to="/testpath">
        Click me
        <Outlet />
      </Link>
    </div>
  );
};

export default App;

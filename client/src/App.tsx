import React, { useEffect } from "react";
import { get, post, patch, put, del } from "./utilities";

const App = () => {
  useEffect(() => {
    console.log("Hello");
    get("/api/user/session").then((res) => console.log(res));
  });
  return <div>This is our app!</div>;
};

export default App;

import React, { useEffect } from "react";
import { get, post, patch, put, del } from "./utilities";
import { Link, Outlet } from "react-router-dom";
import { User } from "../../server/User/model";

const App = () => {
  useEffect(() => {
    console.log("Hello");
    get<{ message: string; user: User }>("/api/user/session").then((res) =>
      console.log(res.user)
    );
  });
  return (
    <div>
      <div>
        This is our app! You can click this <Link to="/subpage">link</Link> to
        go to a subpage.
      </div>

      <Outlet />
    </div>
  );
};

export default App;

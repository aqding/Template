import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("Hello");
    fetch("/api/test")
      .then((res) => res.json())
      .then((res) => console.log(res));
  });
  return <div>This is our app and it is hot reloading!</div>;
};

export default App;

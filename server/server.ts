const express = require("express");
import { Request, Response } from "express";
const api = require("./api");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", api);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    error: "Could not find the endpoint",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

import express from "express";
import { Request, Response } from "express";
import api from "./api";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoConnection = process.env.MONGO_SRV;
if (!mongoConnection) {
  throw new Error(
    "Please add the Mongo SRV as an environment variable named MONGO_SRV"
  );
}

mongoose
  .connect(mongoConnection)
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    `Error connecting to Mongo; ${err}`;
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", api);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    error: "Could not find the endpoint",
  });
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

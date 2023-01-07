import express from "express";
import { Request, Response } from "express";
import api from "./api";
import http from "http";

const app = express();
const port = process.env.port || 3000;

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

import express from "express";
import { Request, Response } from "express";
import api from "./api";

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

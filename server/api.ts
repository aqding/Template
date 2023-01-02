const express = require("express");
import { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  console.log("Received!");
  res.status(200).send({ message: "Server here!" });
});

router.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send({ message: "Received!" });
});

module.exports = router;

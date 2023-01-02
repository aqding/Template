"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
    console.log("Received!");
    res.status(200).send({ message: "Server here!" });
});
router.post("/test", (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "Received!" });
});
module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api = require("./api");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", api);
app.all("*", (req, res) => {
    res.status(404).send({
        error: "Could not find the endpoint",
    });
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

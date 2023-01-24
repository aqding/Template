"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./User/router"));
const router = express_1.default.Router();
router.use("/user", router_1.default);
router.get("/test", (req, res) => {
    console.log("Received!");
    res.status(200).send({ message: "Server here!" });
});
router.post("/test", (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "Cool!" });
});
exports.default = router;

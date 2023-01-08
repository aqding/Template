"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api", api_1.default);
app.all("*", (req, res) => {
    res.status(404).send({
        error: "Could not find the endpoint",
    });
});
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

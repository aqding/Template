"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
// Load in environment variables
dotenv_1.default.config();
// Check environment variables
const mongoConnection = process.env.MONGO_SRV;
if (!mongoConnection) {
    throw new Error("Please add the Mongo SRV as an environment variable named MONGO_SRV");
}
else if (!process.env.SECRET)
    throw new Error("Please add a session secret in the environment variable named SECRET");
// Connect to MongoDB
const client = mongoose_1.default
    .connect(mongoConnection)
    .then((mongo) => {
    console.log("Connected to Mongo");
    return mongo.connection.getClient();
})
    .catch((err) => {
    throw new Error(`Error connecting to Mongo; ${err}`);
});
// Create the express application
const app = (0, express_1.default)();
// Set the port for the server to listen to
const port = process.env.PORT || 3000;
// Allow our server to process JSON
app.use(express_1.default.json());
// Set up sessions stored in Mongo
// See https://www.npmjs.com/package/express-session#options
// and https://www.npmjs.com/package/connect-mongo
// for more information
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    store: connect_mongo_1.default.create({
        clientPromise: client,
        touchAfter: 24 * 3600, // Resave session data once every 24 hours
    }),
}));
// Connect all API requests
app.use("/api", api_1.default);
// Allow serving of static files from dist
const staticPath = path_1.default.resolve(__dirname, "..", "client", "dist");
app.use(express_1.default.static(staticPath));
// Catch unmatched paths, and send back index.html so react-router can handle it
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(staticPath, "index.html"));
});
// Create the server and listen on the specified port
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

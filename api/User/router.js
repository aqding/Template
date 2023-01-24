"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
/**
 * Get the current session.
 *
 * @name GET /api/user/session
 *
 * @return the user if they are logged in, otherwise null
 */
router.get("/session", async (req, res) => {
    if (!req.session.userId)
        res.status(200).json({
            message: "You are not logged in",
            user: null,
        });
    else {
        const user = await model_1.default.findById(req.session.userId);
        res.status(200).json({
            message: "Successfully retrieved user information from session",
            user: user,
        });
    }
});
/**
 * Create a new user. Password is stored as a salted hash
 * in the database. This sets the session with the created
 * user.
 *
 * @name POST /api/user/create
 *
 * @param {string} username - the username of the account
 * @param {string} password - the password of the account
 *
 * @return the user that was created
 */
router.post("/create", async (req, res) => {
    const plaintextPass = req.body.password;
    const saltRounds = 5;
    bcrypt_1.default.hash(plaintextPass, saltRounds).then(async (hash) => {
        const user = new model_1.default({ username: req.body.username, password: hash });
        await user.save();
        req.session.userId = user._id.toString();
        res.status(200).json({
            message: `Successfully created user with username ${user.username}`,
            user: user,
        });
    });
});
/**
 * Login with a username and password. Sets the session
 * with the user if login is successful.
 *
 * @name POST /api/user/login
 *
 * @param {string} username - the username of the account
 * @param {string} password - the password of the account
 *
 * @throws {404} - if a user with the given username is not found
 * @throws {400} - if the password is incorrect
 *
 * @return the user that was created
 *
 */
router.post("/login", async (req, res) => {
    const user = await model_1.default.findOne({ username: req.body.username });
    if (!user) {
        res.status(404).json({
            error: "Unable to find user",
        });
    }
    else {
        const hashedPass = user.password;
        bcrypt_1.default.compare(req.body.password, hashedPass).then((result) => {
            if (result) {
                req.session.userId = user._id.toString();
                res.status(200).json({
                    message: "Successfully logged in!",
                });
            }
            else
                res.status(400).json({ error: "Incorrect password" });
        });
    }
});
exports.default = router;

import UserModel from "./model";
import express from "express";
import e, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const plaintextPass = req.body.password;
  const saltRounds = 5;
  bcrypt.hash(plaintextPass, saltRounds).then(async (hash) => {
    const user = new UserModel({ username: req.body.username, password: hash });
    await user.save();
    res.status(200).json({
      message: `Successfully created user with username ${user.username}`,
    });
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user || !user.password) {
    res.status(404).json({
      error: "Unable to find user",
    });
  } else {
    const hashedPass = user.password;
    bcrypt.compare(req.body.password, hashedPass).then((result) => {
      if (result) {
        res.status(200).json({
          message: "Successfully logged in!",
        });
      } else res.status(400).json({ error: "Incorrect password" });
    });
  }
});
export default router;

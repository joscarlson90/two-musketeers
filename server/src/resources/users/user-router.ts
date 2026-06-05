import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "./user-model.ts";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json("Username is required");
  }
  if (!password) {
    return res.status(400).json("Password is required");
  }

  const findingUser = await UserModel.findOne({ username });
  if (findingUser) {
    return res.status(409).json("Username is taken!");
  }

  const user = await UserModel.create({ username, password });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== "string") {
    return res.status(400).json("Username invalid");
  }
  if (typeof password !== "string") {
    return res.status(400).json("Password invalid");
  }
  const user = await UserModel.findOne({ username }).select("+password");

  if (!user) {
    return res.status(401).json("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, String(user.password));

  if (!isMatch) {
    return res.status(401).json("Invalid username or password");
  }

  res.cookie("userId", user._id.toString());

  res.status(200).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("userId");
  res.sendStatus(204);
});

userRouter.post("/logout", (req, res) => {
  res.clearCookie("userId");
  res.sendStatus(204);
});

export default userRouter;

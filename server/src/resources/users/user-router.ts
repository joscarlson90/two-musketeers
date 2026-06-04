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

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ username, password: hashedPassword });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  });
});

export default userRouter;

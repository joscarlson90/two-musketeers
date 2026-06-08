import express from "express";
import multer from "multer";
import { PostModel } from "./post-model.ts";

const postRouter = express.Router();
const upload = multer({ dest: "uploads/" });

postRouter.post("/", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  if (typeof title !== "string") {
    return res.status(400).json("Title is required");
  }

  if (typeof content !== "string") {
    return res.status(400).json("Content is required");
  }

  try {
    const newPost = new PostModel({
      title,
      content,
      author: userId,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post", error });
  }
});

postRouter.get("/", async (req, res) => {
  const posts = await PostModel.find({});
  return res.status(200).json(posts);
});

export default postRouter;

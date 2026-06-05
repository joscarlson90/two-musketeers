import express from "express";
import { PostModel } from "./post-model.ts";

const postRouter = express.Router();

postRouter.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  if (!title) {
    return res.status(400).json("Title is required");
  }
  if (!content) {
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

export default postRouter;

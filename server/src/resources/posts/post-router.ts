import express from "express";
import mongoose from "mongoose";
import { PostModel } from "./post-model.ts";

const postRouter = express.Router();

const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id).populate("author");

    if (!post) {
      return res.status(404).json(`${id} not found`);
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch post", error });
  }
});

postRouter.post("/", async (req, res) => {
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
      author: toObjectId(userId),
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(400).json(error.message);
    }
    return res.status(400).json({ message: "Failed to create post", error });
  }
});

postRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  if (!title && !content) {
    return res.status(400).json("Title or content is required");
  }

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json(`${id} not found`);
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json("You can only edit your own posts");
    }

    const updates: any = {};
    if (title) updates.title = title;
    if (content) updates.content = content;

    post.set(updates);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(400).json(error.message);
    }
    return res.status(500).json({ message: "Failed to update post", error });
  }
});

postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json(`${id} not found`);
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json("You can only delete your own posts");
    }

    await post.deleteOne();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post", error });
  }
});

export default postRouter;

import express from "express";
import multer from "multer";
import { PostModel } from "./post-model.ts";

const postRouter = express.Router();
const upload = multer({ dest: "uploads/" });

postRouter.post("/posts", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const userId = req.cookies.userId;
  const imageFile = req.file;

  if (!userId) {
    return res.status(401).json("Unauthorized");
  }

  if (!title) {
    return res.status(400).json("Title is required");
  }
  if (!imageFile) {
    return res.status(400).json("Image is required");
  }

  try {
    const newPost = new PostModel({
      title,
      image: imageFile.path,
      author: userId,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post", error });
  }
});

export default postRouter;

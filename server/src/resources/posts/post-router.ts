import express from "express";

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
});

export default postRouter;

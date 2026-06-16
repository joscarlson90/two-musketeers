import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import postRouter from "./resources/posts/post-router.ts";
import userRouter from "./resources/users/user-router.ts";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/login", userRouter);
app.use("/api/logout", userRouter);
app.use("/api/posts", postRouter);

const uploadPath = path.join(process.cwd(), "uploads");
console.log("Serving uploads from:", uploadPath);
app.use("/uploads", express.static(uploadPath));

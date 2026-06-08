import express from "express";
import userRouter from "./resources/users/user-router.ts";
import postRouter from "./resources/posts/post-router.ts";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// SKRIV DIN SERVERKOD HÄR!

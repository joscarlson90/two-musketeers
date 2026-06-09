import cookieParser from "cookie-parser";
import express from "express";
import postRouter from "./resources/posts/post-router.ts";
import userRouter from "./resources/users/user-router.ts";

export const app = express();
app.use(cookieParser());

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", userRouter);
app.use("/api/logout", userRouter);
app.use("/api/posts", postRouter);

// SKRIV DIN SERVERKOD HÄR!

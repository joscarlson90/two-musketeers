import express from "express";
import userRouter from "./resources/users/user-router.ts";

export const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", userRouter);
app.use("/api/logout", userRouter);

// SKRIV DIN SERVERKOD HÄR!

import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.ts";

const PORT = process.env.PORT || 3000;

await mongoose.connect(
  process.env.MONGODB_URL! || "mongodb://localhost:27017/memory-lane",
);
console.log("Connected to database");

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

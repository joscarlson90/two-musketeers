import mongoose from "mongoose";

export interface User {
  username: string;
  password: string | number;
  isAdmin?: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<User>("User", userSchema);

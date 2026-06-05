import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(String(this.password), 10);
});

export const UserModel = mongoose.model<User>("User", userSchema);

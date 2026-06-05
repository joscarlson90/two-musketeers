import mongoose from "mongoose";

export interface Post {
  title: string;
  image: string;
  author: mongoose.Types.ObjectId;
}

const postSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = mongoose.model<Post>("Post", postSchema);

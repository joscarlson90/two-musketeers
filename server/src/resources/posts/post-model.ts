import mongoose, { type Date } from "mongoose";

export interface Post {
  title: string;
  content: string;
  postDate: Date;
  image?: string;
  author: mongoose.Types.ObjectId;
}

const postSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    postDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    image: {
      type: String,
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

import mongoose from "mongoose";

export interface Post {
  title: string;
  content: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  postDate: Date;
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
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = mongoose.model<Post>("Post", postSchema);

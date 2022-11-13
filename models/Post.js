import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    ref: {
      type: String,
      required: true,
    },
    coverimage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "saved", "published"],
      default: "draft",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ ref: 1, deletedAt: 1 });

const Post = models.Post || model("Post", postSchema);

export default Post;

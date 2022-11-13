import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      set: (value) => bcrypt.hashSync(value, 12),
    },
    profileimage: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["author", "reader", "admin"],
      default: "reader",
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const User = models.User || model("User", userSchema);

export default User;

import mongoose, { Schema } from "mongoose";
import ReviewPlace from "./ReviewPlace";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  reviewsEvent: [
    { type: Schema.Types.ObjectId, ref: "ReviewEvent", default: [] },
  ],
  reviewPlace: [
    { type: Schema.Types.ObjectId, ref: "ReviewPlace", default: [] },
  ],
  userType: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

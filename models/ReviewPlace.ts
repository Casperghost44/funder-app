import mongoose, { Schema } from "mongoose";

const reviewPlaceSchema = new Schema({
  rate: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  place: { type: Schema.Types.ObjectId, ref: "Place" },
  reviewText: String,
});

const ReviewPlace =
  mongoose.models.ReviewPlace ||
  mongoose.model("ReviewPlace", reviewPlaceSchema);

export default ReviewPlace;

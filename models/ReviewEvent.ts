import mongoose, { Schema } from "mongoose";

const reviewEventSchema = new Schema({
  rate: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  reviewText: String,
});

const ReviewEvent =
  mongoose.models.ReviewEvent ||
  mongoose.model("ReviewEvent", reviewEventSchema);

export default ReviewEvent;

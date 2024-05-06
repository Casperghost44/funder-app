import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  name: String,
  rating: { type: Number, default: 0 },
  startingPrice: Number,
  endPrice: Number,
  timeStampStart: [{ type: Number }],
  timeStampEnd: [{ type: Number }],
  description: String,
  imagesUrl: [{ type: Schema.Types.String }],
  reviewsEvent: [
    { type: Schema.Types.ObjectId, ref: "ReviewEvent", default: [] },
  ],
  place: { type: Schema.Types.ObjectId, ref: "Place" },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

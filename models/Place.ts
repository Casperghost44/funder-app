import mongoose, { Schema } from "mongoose";
import ReviewPlace from "./ReviewPlace";

const placeSchema = new Schema({
  name: String,
  rating: { type: Number, default: 0 },
  startingPrice: Number,
  endPrice: Number,
  coordinates: { lat: Number, lng: Number },
  minPeople: Number,
  maxPeople: Number,
  timeStampStart: Date,
  timeStampEnd: Date,
  description: String,
  imagesUrl: [{ type: Schema.Types.String }],
  reviewsPlace: [{ type: Schema.Types.ObjectId, ref: "ReviewPlace" }],
  placeType: { type: String, enum: ["bar", "club"] },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;

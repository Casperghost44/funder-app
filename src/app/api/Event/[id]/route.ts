import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../libs/dbConnect";
import Event from "../../../../../models/Event";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      newName: name,
      newStartingPrice: startingPrice,
      newEndPrice: endPrice,
      newTimeStampStart: timeStampStart,
      newTimeStampEnd: timeStampEnd,
      newDescription: description,
      newImagesUrl: imagesUrl,
      newReviewsEvent: reviewsEvent,
      newPlace: place,
    } = await request.json();

    dbConnect();

    await Event.findByIdAndUpdate(id, {
      name,
      startingPrice,
      endPrice,
      timeStampStart,
      timeStampEnd,
      description,
      imagesUrl,
      reviewsEvent,
      place,
    });
    return NextResponse.json({ message: "Event Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    dbConnect();
    const event = await Event.findOne({ _id: id })
      .populate("place")
      .populate("reviewsEvent");

    if (!event) {
      return NextResponse.json(
        { message: "Event does not exist" },
        { status: 400 }
      );
    }

    // Calculate the average rating
    const reviews = event.reviewsEvent;
    const totalRatings = reviews.reduce((acc, curr) => acc + curr.rate, 0);
    const averageRating =
      reviews.length > 0 ? totalRatings / reviews.length : 0;

    // Create a new object with the calculated average rating
    const eventWithRating = {
      ...event.toObject(),
      rating: averageRating,
    };

    return NextResponse.json({ event: eventWithRating }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../libs/dbConnect";
import Place from "../../../../../models/Place";

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
      newCoordinates: coordinates,
      newMinPeople: minPeople,
      newMaxPeople: maxPeople,
      newTimeStampStart: timeStampStart,
      newTimeStampEnd: timeStampEnd,
      newDescription: description,
      newImagesUrl: imagesUrl,
      newReviewsPlace: reviewsPlace,
      newPlaceType: placeType,
      newEvent: event,
    } = await request.json();

    dbConnect();

    await Place.findByIdAndUpdate(id, {
      name,
      startingPrice,
      endPrice,
      coordinates,
      minPeople,
      maxPeople,
      timeStampStart,
      timeStampEnd,
      description,
      imagesUrl,
      reviewsPlace,
      placeType,
      event,
    });
    return NextResponse.json({ message: "Place Updated" }, { status: 200 });
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
    const place = await Place.findOne({ _id: id })
      .populate("event")
      .populate("reviewsPlace");

    if (!place) {
      return NextResponse.json(
        { message: "Place does not exist" },
        { status: 400 }
      );
    }

    // Calculate the average rating
    const reviews = place.reviewsPlace;
    const totalRatings = reviews.reduce((acc, curr) => acc + curr.rate, 0);
    const averageRating =
      reviews.length > 0 ? totalRatings / reviews.length : 0;

    // Create a new object with the calculated average rating
    const placeWithRating = {
      ...place.toObject(),
      rating: averageRating,
    };

    return NextResponse.json({ place: placeWithRating }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

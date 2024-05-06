import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../libs/dbConnect";
import Place from "../../../../models/Place";
import ReviewPlace from "../../../../models/ReviewPlace";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    let places = await Place.find().populate("event").populate("reviewsPlace");

    places = await Promise.all(
      places.map(async (place) => {
        const reviews = await ReviewPlace.find({ place: place._id });
        const totalRatings = reviews.reduce((acc, curr) => acc + curr.rate, 0);
        const averageRating =
          reviews.length > 0 ? totalRatings / reviews.length : 0;

        return { ...place.toObject(), rating: averageRating };
      })
    );

    return NextResponse.json({ places }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
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
    } = await request.json();

    await Place.create({
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

    return NextResponse.json(
      { message: "Place has been created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    dbConnect();
    await Place.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Place has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

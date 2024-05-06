import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../libs/dbConnect";
import ReviewPlace from "../../../../models/ReviewPlace";
import Place from "../../../../models/Place";
import User from "../../../../models/User";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    const reviews = await ReviewPlace.find();
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Can't connect to database",
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rate, user, place, reviewText } = await request.json();

    const newReview = await ReviewPlace.create({
      rate,
      user,
      place,
      reviewText,
    });

    await Place.findByIdAndUpdate(place, {
      $push: { reviewsPlace: newReview._id },
    });

    await User.findByIdAndUpdate(user, {
      $push: { reviewPlace: newReview._id },
    });

    return NextResponse.json(
      { message: "Review has been created!" },
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
    const review = await ReviewPlace.findById(id);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Find all places that reference the review
    const places = await Place.find({ reviewsPlace: id });

    const user = await User.find({ reviewsPlace: id });

    // Remove the review's ID from the reviewsPlace array of associated places
    await Promise.all(
      places.map((place) => {
        place.reviewsPlace.pull(id);
        return place.save();
      })
    );

    await Promise.all(
      user.map((usr) => {
        usr.reviewsPlace.pull(id);
        return usr.save();
      })
    );

    await ReviewPlace.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Review has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}

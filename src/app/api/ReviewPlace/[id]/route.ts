import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../libs/dbConnect";
import ReviewPlace from "../../../../../models/ReviewPlace";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      newRate: rate,
      newUser: user,
      newPlace: place,
      newReviewText: reviewText,
    } = await request.json();

    dbConnect();

    await ReviewPlace.findByIdAndUpdate(id, {
      rate,
      user,
      place,
      reviewText,
    });
    return NextResponse.json({ message: "Review Updated" }, { status: 200 });
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
    const review = await ReviewPlace.findOne({ _id: id });

    if (!review) {
      return NextResponse.json(
        { message: "Place does not exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

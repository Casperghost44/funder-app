import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../../libs/dbConnect";
import ReviewEvent from "../../../../../models/ReviewEvent";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      newRate: rate,
      newUser: user,
      newEvent: event,
      newReviewText: reviewText,
    } = await request.json();

    dbConnect();

    await ReviewEvent.findByIdAndUpdate(id, {
      rate,
      user,
      event,
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
    const review = await ReviewEvent.findOne({ _id: id });

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

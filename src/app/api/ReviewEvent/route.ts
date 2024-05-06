import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../../libs/dbConnect";
import ReviewEvent from "../../../../models/ReviewEvent";
import Event from "../../../../models/Event";
import User from "../../../../models/User";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    const reviews = await ReviewEvent.find();
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
    const { rate, user, event, reviewText } = await request.json();

    const newReview = await ReviewEvent.create({
      rate,
      user,
      event,
      reviewText,
    });

    await Event.findByIdAndUpdate(event, {
      $push: { reviewsEvent: newReview._id },
    });

    await User.findByIdAndUpdate(user, {
      $push: { reviewsEvent: newReview._id },
    });

    return NextResponse.json(
      { message: "Review has been created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    dbConnect();

    const review = await ReviewEvent.findById(id);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    const events = await Event.find({ reviewsPlace: id });

    await Promise.all(
      events.map((event) => {
        event.reviewsEvent.pull(id);
        return event.save();
      })
    );

    await ReviewEvent.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Review has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

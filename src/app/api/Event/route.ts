import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";
import ReviewEvent from "../../../../models/ReviewEvent";
import Place from "../../../../models/Place";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    let events = await Event.find().populate("place").populate("reviewsEvent");

    events = await Promise.all(
      events.map(async (event) => {
        const reviews = await ReviewEvent.find({ event: event._id });
        const totalRatings = reviews.reduce((acc, curr) => acc + curr.rate, 0);
        const averageRating =
          reviews.length > 0 ? totalRatings / reviews.length : 0;

        return { ...event.toObject(), rating: averageRating };
      })
    );

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Can't connect to database",
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      startingPrice,
      endPrice,
      timeStampStart,
      timeStampEnd,
      description,
      imagesUrl,
      place,
    } = await request.json();

    const event = await Event.create({
      name,
      startingPrice,
      endPrice,
      timeStampStart,
      timeStampEnd,
      description,
      imagesUrl,
      place,
    });

    await Place.findByIdAndUpdate(place, { $set: { event: event._id } });

    return NextResponse.json(
      { message: "Event has been created!" },
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
    await Event.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Event has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import dbConnect from "../../../../libs/dbConnect";
import bcryptjs from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    const userId = await getDataFromToken(request)?.id;
    const user = await User.findById({ _id: userId })
      .select("-password")
      .populate("reviewsEvent")
      .populate("reviewPlace");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request)?.id;
    const {
      newUsername: username,
      newPassword: password,
      newEmail: email,
    } = await request.json();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { username, password: hashedPassword, email }
    );

    return NextResponse.json(
      {
        message: "User Updated",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    dbConnect();
    await User.findByIdAndDelete(userId?.id);
    const response = NextResponse.json({
      message: "Logout and user has been deleted Successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}

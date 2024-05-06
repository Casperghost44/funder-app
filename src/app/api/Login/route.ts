import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  dbConnect();

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 400 }
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 400 });
  }

  const tokenData = { id: user._id, email: user.email };

  const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
    expiresIn: "1h",
  });

  const response = NextResponse.json(
    { message: "Login successfully!", user: user },
    { status: 200 }
  );

  response.cookies.set("token", token, { httpOnly: true });

  return response;
}

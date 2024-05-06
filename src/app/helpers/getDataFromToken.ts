import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  if (token !== "") {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN!);
    return decodedToken;
  }
  return undefined;
};

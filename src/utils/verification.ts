import jwt from "jsonwebtoken";
import { type UserDocument } from "@/models/User";

export function generateAccessToken(user: UserDocument) {
  return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1 day",
  });
}

export function generateRefreshToken(user: UserDocument) {
  return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET as string);
}

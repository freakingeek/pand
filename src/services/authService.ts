import { randomUUID } from "crypto";
import { ClientError } from "@/utils/error";
import { sendVerificationEmail } from "@/emails";
import User, { type UserDocument } from "@/models/User";
import { generateAccessToken, generateRefreshToken } from "@/utils/verification";

export async function register(userData: { email: string }) {
  const user = await User.create({
    email: userData.email,
    verificationToken: randomUUID(),
  });

  await sendVerificationEmail(user.email, user.verificationToken);
}

export async function verify(verificationToken: string) {
  const updatedUser = await User.findOneAndUpdate(
    { verificationToken, verified: false },
    { verified: true },
    { new: true }
  );

  if (!updatedUser) {
    throw new ClientError(
      "این لینک اونی نیست که ما برات فرستادیم یا شایدم حسابت قبلا فعال شده!",
      400
    );
  }

  return {
    accessToken: generateAccessToken(updatedUser),
    refreshToken: generateRefreshToken(updatedUser),
  };
}

export async function login(verificationToken: string) {}

export async function logout(verificationToken: string) {}

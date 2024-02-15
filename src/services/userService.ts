import { randomUUID } from "crypto";
import { ClientError } from "@/utils/error";
import { sendVerificationEmail } from "@/emails";
import User, { type UserDocument } from "@/models/User";
import { generateAccessToken, generateRefreshToken } from "@/utils/verification";

export async function getAllUsers(): Promise<UserDocument[]> {
  return User.find();
}

export async function createNewUser(userData: Partial<UserDocument>): Promise<UserDocument> {
  const hashedPassword = userData.password ? await Bun.password.hash(userData.password) : undefined;
  const verificationToken = randomUUID();

  userData.password = hashedPassword;
  userData.verificationToken = verificationToken;

  const user = await User.create(userData);

  await sendVerificationEmail(user.email, user.verificationToken);

  return user;
}

export async function verifyNewUser(verificationToken: string) {
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
    user: updatedUser,
    tokens: {
      accessToken: generateAccessToken(updatedUser),
      refreshToken: generateRefreshToken(updatedUser),
    },
  };
}

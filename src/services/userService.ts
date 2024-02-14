import { randomUUID } from "crypto";
import { sendVerificationEmail } from "@/emails";
import User, { type UserDocument } from "@/models/User";

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

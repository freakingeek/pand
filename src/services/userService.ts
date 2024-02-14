import User, { type UserDocument } from "@/models/User";

export async function getAllUsers(): Promise<UserDocument[]> {
  return User.find();
}
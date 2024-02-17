import { ClientError } from "@/utils/error";
import User, { type UserDocument } from "@/models/User";

export async function getAllUsers(): Promise<UserDocument[]> {
  return User.find();
}

export async function getUserById(id: string) {
  const user = User.findOne({ _id: id, verified: true });

  if (!user) {
    throw new ClientError("لطفا یه بار از حسابت برو بیرون و دوباره وارد شو", 401);
  }

  return user;
}

export async function updateUserProfile(userData: Partial<UserDocument>) {
  const user = User.findOneAndUpdate({ _id: userData._id, verified: true }, userData, {
    new: true,
  });

  if (!user) {
    throw new ClientError("لطفا یه بار از حسابت برو بیرون و دوباره وارد شو", 401);
  }

  return user;
}

export async function deleteUserById(id: string) {
  const user = User.findOneAndDelete({ _id: id, verified: true });

  if (!user) {
    throw new ClientError("لطفا یه بار از حسابت برو بیرون و دوباره وارد شو", 401);
  }

  return user;
}

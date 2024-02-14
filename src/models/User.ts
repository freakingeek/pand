import { UUID } from "crypto";
import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  verificationToken: UUID;
}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

userSchema.set("timestamps", true);

// userSchema.set('toJSON', {
//   transform: (_, ret) => {
//     const { password, verificationToken, __v, ...rest } = ret;

//     return rest;
//   },
// });

export default mongoose.model<UserDocument>("User", userSchema);

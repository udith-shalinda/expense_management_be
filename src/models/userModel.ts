import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

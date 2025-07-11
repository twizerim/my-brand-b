import mongoose, { Schema, Document } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Role), // Ensures only "user" or "admin"
    default: Role.USER,
  },
});

export default mongoose.model<IUser>("User", UserSchema);

import mongoose, { Schema, Document } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  image:string;
  password: string;
  confirmPassword:string,
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
  image:{
    type:String,
    default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword:{
    type:String,
    required:false
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  },
});

export default mongoose.model<IUser>("User", UserSchema);

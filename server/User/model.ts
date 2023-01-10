import { Schema, model } from "mongoose";

export interface User {
  username: string;
  password: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>("user", UserSchema);

export default UserModel;

import mongoose, { Document } from "mongoose";

export class User extends Document {}

const UserSchema = new mongoose.Schema({
  type: String,
  code: String,
  name_th: String,
  name_en: String,
  active: Boolean,
});

export default mongoose.model("user", UserSchema);

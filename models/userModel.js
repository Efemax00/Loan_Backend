// models/userModel.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isSuspended: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

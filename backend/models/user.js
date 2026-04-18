import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
  type: String,
  required: true,
},
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
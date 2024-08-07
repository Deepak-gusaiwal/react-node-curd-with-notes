import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [3, "name can'nt be less than 3 charachters"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password can'nt be less than 6 charachters"],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "viewer"],
      default: "viewer",
    }
  },
  { timestamps: true }
);
// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
// Method to verify the password
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};
//Method to generate jwt
userSchema.methods.generateToken = function (expiresIn = "7d") {
  try {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
  } catch (err) {
    console.log("B - Error While Generating Token ::", err);
    throw new Error(err);
  }
};
//Method to verify jwt
userSchema.methods.verifyToken = function (token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("B - Error While Verfiy Token ::", err);
    throw new Error("Invalid Token Please Login Again");
  }
};
export const User = model("User", userSchema);

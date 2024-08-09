import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/error.js";

export const authChecker = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log("no token provided");
    return next(new ErrorHandler("Unauthorized: No token provided", 400));
  }
  const tempUser = new User({});
  const decoded = tempUser.verifyToken(token);
  req.userId = decoded.userId;
  next();
});

import { User } from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/error.js";

// Signup user controller
export const signupUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = new User({ username, email, password });
    await user.save();
    const token = user.generateToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    // Exclude the password field
    user = user.toObject();
    delete user.password;
    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Signup Successfully", { token, user })
    );
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const message = error.keyPattern.username
        ? "User with this name already exists"
        : "This email is already registered";
      return next(new ErrorHandler(message, 400));
    }
    // Pass any other errors to the error-handling middleware
    return next(error);
  }
});

//2. login a user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorHandler("provide valid email Or Password", 400));
    }
    // check email is exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("No User Found", 400));
    }
    // verify password
    const isPasswordMatch = await user.isValidPassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }
    const token = user.generateToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    // Exclude the password field
    user = user.toObject();
    delete user.password;
    return ApiResponse.send(
      res,
      200,
      ApiResponse.success("Login Successfully", { token, user })
    );
  } catch (error) {
    return next(error);
  }
});
// logout user
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return ApiResponse.send(res, 200, ApiResponse.success("logout successfully"));
};
// get user details
export const getMyProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return next(new ErrorHandler("No User Found", 400));
  }
  return ApiResponse.send(
    res,
    200,
    ApiResponse.success("fetch Profile successfully", { user })
  );
});
//editProfile
export const editProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { username, avatar } = req.body;
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("No User Found", 400));
  }
  if (user.username === username) {
    return next(new ErrorHandler("You Already Used This User Name", 400));
  }
  if (user.avatar === avatar) {
    return next(
      new ErrorHandler("This image is already set as Profile Image", 400)
    );
  }

  if (username) {
    user.username = username;
  }
  if (avatar) {
    user.avatar = avatar;
  }
  await user.save();
  let response = await User.findById(userId).select("-password");

  return ApiResponse.send(
    res,
    200,
    ApiResponse.success(
      `your profile ${
        username && !avatar ? "name" : !username && avatar ? "image" : ""
      } is updated successfully`,
      { user: response }
    )
  );
});
//change password
export const changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { currentPassword, newPassword } = req.body;
  let user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("No User Found", 400));
  }
  // verify password
  const isPasswordMatch = await user.isValidPassword(currentPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Credentials Please Try Again", 400));
  }
  // Check if new password is the same as the old one
  const isNewPasswordMatch = await user.isValidPassword(newPassword);
  if (isNewPasswordMatch) {
    return next(
      new ErrorHandler(
        "You can't set the previous password as the new password",
        400
      )
    );
  }
  user.password = newPassword;
  await user.save();

  return ApiResponse.send(
    res,
    200,
    ApiResponse.success("password is updated successfully", {})
  );
});

import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  signupUser,
  editProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { authChecker } from "../middlewares/authChecker.js";
const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/myprofile", authChecker, getMyProfile);
router.put("/edit-profile", authChecker, editProfile);
router.put("/change-password", authChecker, changePassword);
export default router;

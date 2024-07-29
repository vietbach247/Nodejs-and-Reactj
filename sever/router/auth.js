import { Router } from "express";
import path from "path";
import multer from "multer";
import {
  forgotPassword,
  resetPassword,
  getProfile,
  Login,
  logout,
  Register,
  confirmEmail,
  updateProfile,
  createAvatarProfile,
} from "../controllers/auth";
import { authentication } from "../middleware/authentication";
import upload from "../configs/multerConfig";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/profile", authentication, getProfile);
authRouter.post("/logout", authentication, logout);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.get("/confirm-email/:token", confirmEmail);
authRouter.post("/resetPassword/:token", resetPassword);
authRouter.post("/upload", upload.array("avatars"), createAvatarProfile);
authRouter.put(
  "/updateProfile",
  authentication,
  upload.single("avatar"),
  updateProfile
);

export default authRouter;

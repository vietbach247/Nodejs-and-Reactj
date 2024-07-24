import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  getProfile,
  Login,
  logout,
  Register,
  confirmEmail,
} from "../controllers/auth";
import { authentication } from "../middleware/authentication";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/profile", authentication, getProfile);
authRouter.post("/logout", authentication, logout);
authRouter.post("/forgotPassword", forgotPassword);
authRouter.get("/confirm-email/:token", confirmEmail);
authRouter.post("/resetPassword/:token", resetPassword);

export default authRouter;

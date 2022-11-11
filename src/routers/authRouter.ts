import express from "express";
import {
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidation.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(`/signup`, signUpValidation, signUp);
authRouter.post(`/signin`, signInValidation, signIn);

export { authRouter };

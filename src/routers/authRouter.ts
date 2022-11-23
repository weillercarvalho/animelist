import express from "express";
import {
  signUpValidation,
  signInValidation,
} from "../middlewares/authValidation";
import { signUp, signIn } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post(`/signup`, signUpValidation, signUp);
authRouter.post(`/signin`, signInValidation, signIn);

export { authRouter };

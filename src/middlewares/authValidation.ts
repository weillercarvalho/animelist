import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode";
import { SignUpProtocol } from "../protocols/signUp";
import { SignInProtocol } from "../protocols/signIn";
import Joi from "joi";
import { signupSchema } from "../schemas/signUpSchema";
import { signInSchema } from "../schemas/signInSchema";
function signUpValidation(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, confirmPassword } = req.body as SignUpProtocol;
  const validation: Joi.ValidationResult = signupSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const messageError: string[] = validation.error.details.map(
      (v) => v.message
    );
    return res.status(STATUS_CODE.UNPROCESSABLE).send(messageError);
  }
  if (!name || !email || !password || !confirmPassword) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  if (password !== confirmPassword) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}

function signInValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password }: SignInProtocol = req.body;
  if (!email || !password) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  const validation: Joi.ValidationResult = signInSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const messageError: string[] = validation.error.details.map(
      (v) => v.message
    );
    return res.status(STATUS_CODE.UNPROCESSABLE).send(messageError);
  }
  next();
}

export { signUpValidation, signInValidation };

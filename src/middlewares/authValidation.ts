import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode.js";
import { SignUpProtocol } from "../protocols/signUp.js";
import { SignInProtocol } from "../protocols/signIn.js";
import Joi from "joi";
import { signupSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
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

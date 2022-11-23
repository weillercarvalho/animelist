import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode";
import { SignUpProtocol } from "../protocols/signUp";
import { SignInProtocol } from "../protocols/signIn";
import bcrypt from "bcrypt";
import {
  firstRepository,
  secondRepository,
  thirdRepository,
} from "../repositorys/authRepository";
import { JWT } from "../services/jwt";

async function signUp(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body as SignUpProtocol;
  const hashing: string = bcrypt.hashSync(password, 10);

  try {
    const findEmail = await firstRepository(email);
    if (findEmail.rows.length > 0) {
      return res.sendStatus(STATUS_CODE.CONFLICT);
    }
    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

async function signIn(req: Request, res: Response) {
  const { email, password }: SignInProtocol = req.body;
  try {
    const gettingEmail = await secondRepository(email);
    const getpass: string = gettingEmail.rows[0].password;
    const getemail: string = gettingEmail.rows[0].email;
    const getuserId: number = gettingEmail.rows[0].id;
    const confirmHashing: boolean = bcrypt.compareSync(password, getpass);
    if (!confirmHashing) {
      return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    const token = JWT(getuserId);
    const query = await thirdRepository(getuserId, getemail, getpass, token);
    return res.send({ token });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
export { signUp, signIn };

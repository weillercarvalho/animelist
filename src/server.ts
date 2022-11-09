import express from 'express';
import { Request, Response } from 'express';
import Joi, { boolean } from 'joi';
import dotenv from 'dotenv';
import {connection} from './database/db.js'
import { STATUS_CODE } from './enums/statusCode.js';
import {SignUpProtocol} from './protocols/signUp.js'
import {SignInProtocol} from './protocols/signIn.js'
import bcrypt from 'bcrypt';
import { QueryResult } from 'pg';

dotenv.config();

const server = express();

server.use(express.json())

const signupSchema = Joi.object({
    name: Joi.string().empty(" ").min(3).max(30).required(),
    email: Joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
      .empty(" ")
      .min(6)
      .max(40)
      .required(),
    password: Joi
      .string()
      .empty(" ")
      .min(6)
      .max(100)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi
    .string()
    .empty(" ")
    .min(6)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
}) 

const signInSchema = Joi.object({
    email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
    .empty(" ")
    .min(6)
    .max(40)
    .required(),
  password: Joi
    .string()
    .empty(" ")
    .min(6)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
})

server.post(`/signup`, async (req: Request,res: Response) => {
    const {name, email, password, confirmPassword}: SignUpProtocol = req.body;
    const validation: Joi.ValidationResult = signupSchema.validate(req.body, {abortEarly : false})
    if (validation.error) {
        const messageError: string[] = validation.error.details.map(v => v.message);
        return res.status(STATUS_CODE.UNPROCESSABLE).send(messageError)
    }
    if (!name || !email || !password || !confirmPassword) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }
    if (password !== confirmPassword) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }
    const hashing: string = bcrypt.hashSync(password,10);

    try {
        const findEmail = await connection.query(`SELECT * FROM users WHERE email = $1`,[email])
        if (findEmail.rows.length > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }
        const query = await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,[name,email,hashing]);
        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message)
    }
})

server.post(`/signin`, async (req: Request,res: Response) => {
    const {email, password}: SignInProtocol = req.body;
    if (!email || !password) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }
    const validation: Joi.ValidationResult = signInSchema.validate(req.body,{abortEarly: false});
    if (validation.error) {
        const messageError: string[] = validation.error.details.map(v => v.message);
        return res.status(STATUS_CODE.UNPROCESSABLE).send(messageError)
    }
    try {
        const gettingEmail =await connection.query(`SELECT * FROM users WHERE email = $1`,[email]);
        const getpass: string = (gettingEmail).rows[0].password;
        const getemail: string = (gettingEmail).rows[0].email;
        const getuserId: string = (gettingEmail).rows[0].id;
        const confirmHashing: boolean = bcrypt.compareSync(password,getpass);
        if (!confirmHashing) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }
        const query = await connection.query(`INSERT INTO sessions ("userId",email,password) VALUES ($1,$2,$3)`,[getuserId,getemail,getpass]);
        return res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
})

server.get(`/animeslist`, async (req: Request, res: Response) => {
    return res.send(`Pegar lista de animes`)
})

server.put(`/animelist/:id`, async (req: Request, res: Response) => {
    return res.send(`Atualizar lista de animes`)
}) 

server.delete(`/animelist/:id`, async (req: Request, res: Response) => {
    return res.send(`Deletar lista de animes.`)
})

server.listen(process.env.PORT, () => {
    console.log(`Listening on the ${process.env.PORT} port`)
});
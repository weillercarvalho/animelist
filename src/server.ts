import express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';
import dotenv from 'dotenv';

import {SignUpProtocol} from './protocols/signUp'
import {SignInProtocol} from './protocols/signIn'

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

server.post(`/signup`, async (req: Request,res: Response) => {
    return res.send(`singup`)
})

server.post(`/signin`, async (req: Request,res: Response) => {
    return res.send(`Ok`)
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
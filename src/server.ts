import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routers/authRouter.js";
import { animeRouter } from "./routers/animelistRouter.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(authRouter);
server.use(animeRouter);

server.listen(process.env.PORT, () => {
  console.log(`Listening on the ${process.env.PORT} port`);
});

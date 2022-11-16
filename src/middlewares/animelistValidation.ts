import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode.js";
import { AnimelistProtocol } from "../protocols/list.js";
function getAllListValidation(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}

function getSomeListValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  const integerId = parseInt(id, 10);
  if (isNaN(integerId)) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}

function postAnimelistValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  const { name, review, image, rate }: AnimelistProtocol = req.body;
  if (!name || !review || !image || !rate) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}

function updateAnimelistValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, review, image, rate }: AnimelistProtocol = req.body;
  const idparams = req.params.id as string;
  const userIdparams = req.params.userId as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  const integerId = parseInt(idparams, 10);
  const integeruserId = parseInt(userIdparams, 10);
  if (
    !token ||
    !idparams ||
    !name ||
    !review ||
    !image ||
    !rate ||
    !userIdparams
  ) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  if (isNaN(integerId)) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}

function deleteAnimelistValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  if (!token) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  const integerId = parseInt(id, 10);
  if (isNaN(integerId)) {
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
  next();
}
export {
  getAllListValidation,
  getSomeListValidation,
  postAnimelistValidation,
  updateAnimelistValidation,
  deleteAnimelistValidation,
};

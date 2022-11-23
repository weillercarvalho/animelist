import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/statusCode";
import {
  firstRepository,
  secondRepository,
  thirdRepository,
  fourthRepository,
  fifthRepository,
  sixthRepository,
  seventhRepository,
} from "../repositorys/animelistRepository";
import { AnimelistProtocol } from "../protocols/list";

async function getAllLists(req: Request, res: Response) {
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  try {
    const gettingdateSection = await firstRepository();
    const getuserId: number = gettingdateSection.rows[0].userId;
    const gettoken: string = gettingdateSection.rows[0].token;
    if (gettoken !== token) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }
    const query = await secondRepository(getuserId);
    return res.send(query.rows);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

async function getSomeLists(req: Request, res: Response) {
  const id = req.params.id as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  const integerId = parseInt(id, 10);
  try {
    const query = await thirdRepository(integerId);
    return res.send(query.rows);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

async function postAnimelist(req: Request, res: Response) {
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  const { name, review, image, rate }: AnimelistProtocol = req.body;
  try {
    const gettingSession = await fourthRepository();
    const gettoken: string = gettingSession.rows[0].token;
    if (gettoken !== token) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }
    const getuserId: number = gettingSession.rows[0].userId;
    const getsessionId: number = gettingSession.rows[0].id;
    const query = await fifthRepository(
      getuserId,
      getsessionId,
      name,
      review,
      image,
      rate,
      gettoken
    );
    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

async function updateAnimelist(req: Request, res: Response) {
  const { name, review, image, rate }: AnimelistProtocol = req.body;
  const idparams = req.params.id as string;
  const userIdparams = req.params.userId as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  const integerId = parseInt(idparams, 10);
  const integeruserId = parseInt(userIdparams, 10);
  try {
    const query = await sixthRepository(
      name,
      review,
      image,
      rate,
      integerId,
      integeruserId
    );
    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

async function deleteAnimelist(req: Request, res: Response) {
  const id = req.params.id as string;
  const authorization = req.headers.authorization as string;
  const token: string = authorization?.replace(`Bearer `, ``);
  const integerId = parseInt(id, 10);
  try {
    const query = await seventhRepository(integerId);
    return res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
export {
  getAllLists,
  getSomeLists,
  postAnimelist,
  updateAnimelist,
  deleteAnimelist,
};

import express from "express";
import {
  getAllListValidation,
  getSomeListValidation,
  postAnimelistValidation,
  updateAnimelistValidation,
  deleteAnimelistValidation,
} from "../middlewares/animelistValidation";
import {
  getAllLists,
  getSomeLists,
  postAnimelist,
  updateAnimelist,
  deleteAnimelist,
} from "../controllers/animelistController";

const animeRouter = express.Router();

animeRouter.get(`/animelist`, getAllListValidation, getAllLists);
animeRouter.get(`/animelist/rate/:id`, getSomeListValidation, getSomeLists);
animeRouter.post(`/animelist`, postAnimelistValidation, postAnimelist);
animeRouter.put(
  `/animelist/:id/:userId`,
  updateAnimelistValidation,
  updateAnimelist
);
animeRouter.delete(
  `/animelist/:id`,
  deleteAnimelistValidation,
  deleteAnimelist
);

export { animeRouter };

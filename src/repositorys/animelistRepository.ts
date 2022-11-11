import { connection } from "../database/db.js";
import { QueryResult } from "pg";
import { Users } from "../protocols/signUp.js";
import { Sessions } from "../protocols/signIn.js";
import { Animes } from "../protocols/list.js";

async function firstRepository(): Promise<QueryResult<Sessions>> {
  const gettingdateSection = await connection.query(
    `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
  );
  return gettingdateSection;
}

async function secondRepository(
  getuserId: number
): Promise<QueryResult<Animes>> {
  const query = await connection.query(
    `SELECT * FROM animes WHERE "userId" = $1`,
    [getuserId]
  );
  return query;
}
async function thirdRepository(
  integerId: number
): Promise<QueryResult<Animes>> {
  const query = await connection.query(
    `SELECT SUM(animes.rate) AS "totalRate",name FROM animes WHERE "userId" = $1 GROUP BY id;`,
    [integerId]
  );
  return query;
}
async function fourthRepository(): Promise<QueryResult<Sessions>> {
  const gettingSession = await connection.query(
    `SELECT * FROM sessions ORDER BY id DESC LIMIT 1;`
  );
  return gettingSession;
}
async function fifthRepository(
  getuserId: number,
  getsessionId: number,
  name: string,
  review: string,
  image: string,
  rate: number,
  gettoken: string
): Promise<QueryResult<Animes>> {
  const query = await connection.query(
    `INSERT INTO animes ("userId", "sessionId", "name", "review", "image", "rate", "token") VALUES ($1,$2,$3,$4,$5,$6,$7);`,
    [getuserId, getsessionId, name, review, image, rate, gettoken]
  );
  return query;
}
async function sixthRepository(
  name: string,
  review: string,
  image: string,
  rate: number,
  integerId: number,
  integeruserId: number
): Promise<QueryResult<Animes>> {
  const query = await connection.query(
    `UPDATE animes SET "name" = $1, "review" = $2, "image" = $3, "rate" = $4 WHERE id = $5 AND "userId" = $6;`,
    [name, review, image, rate, integerId, integeruserId]
  );
  return query;
}
async function seventhRepository(
  integerId: number
): Promise<QueryResult<Animes>> {
  const query = await connection.query(`DELETE FROM animes WHERE id = $1;`, [
    integerId,
  ]);
  return query;
}
export {
  firstRepository,
  secondRepository,
  thirdRepository,
  fourthRepository,
  fifthRepository,
  sixthRepository,
  seventhRepository,
};

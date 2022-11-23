import { connection } from "../database/db";
import { QueryResult } from "pg";
import { Users } from "../protocols/signUp";
import { Sessions } from "../protocols/signIn";
async function firstRepository(email: string): Promise<QueryResult<Users>> {
  const findEmail = await connection.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  return findEmail;
}
async function secondRepository(email: string): Promise<QueryResult<Users>> {
  const gettingEmail = await connection.query(
    `SELECT * FROM users WHERE email = $1;`,
    [email]
  );
  return gettingEmail;
}
async function thirdRepository(
  getuserId: number,
  getemail: string,
  getpass: string,
  token: string
): Promise<QueryResult<Sessions>> {
  const query = await connection.query(
    `INSERT INTO sessions ("userId",email,password, token) VALUES ($1,$2,$3,$4);`,
    [getuserId, getemail, getpass, token]
  );
  return query;
}

export { firstRepository, secondRepository, thirdRepository };

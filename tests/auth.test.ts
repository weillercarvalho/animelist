import supertest from "supertest";
import server from "../src/server";
import { connection } from "../src/database/db";
import { faker } from "@faker-js/faker";
const api = supertest(server);

beforeAll(async () => {
  await connection.query(`DELETE FROM animes;`);
  await connection.query(`DELETE FROM sessions;`);
  await connection.query(`DELETE FROM users;`); // prisma.users.deleteMany();
});

afterAll(async () => {
  await connection.query(`DELETE FROM animes;`);
  await connection.query(`DELETE FROM sessions;`);
  await connection.query(`DELETE FROM users;`); // prisma.users.deleteMany();
});

const fakerPassword = faker.internet.password();

describe("Test the API", () => {
  it("Test the EndPoint POST: /signup", async () => {
    const resultado = await api.post("/signup").send({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: fakerPassword,
      confirmPassword: fakerPassword,
    });

    console.log("🚀 ~ file: auth.test.ts ~ line 9 ~ it ~ resultado", resultado);
    expect(resultado.status).toBe(201);
  });
});

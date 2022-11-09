import jwt from "jsonwebtoken";

function JWT(id:number) : string {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
};

export { JWT };

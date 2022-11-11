import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
    .empty(" ")
    .min(6)
    .max(40)
    .required(),
  password: Joi.string()
    .empty(" ")
    .min(6)
    .max(100)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

export { signInSchema };

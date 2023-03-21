import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .trim()
    .required()
    .label("Email")
    .messages({
      "string.empty": "Please provide an email",
      "string.email": "Please provide a valid email",
    }),
  password: Joi.string()
  .trim()
    .pattern(new RegExp("[a-z]{1,}"), "lowercase")
    .pattern(new RegExp("[A-Z]{1,}"), "uppercase")
    .pattern(new RegExp("[0-9]{1,}"), "number")
    .min(6)
    .max(50)
    .required()
    .label("Password")
    .messages({
      "string.empty": "Please provide a password",
      "string.min": "Password should be at least 6 characters",
      "string.max": "Password should be be less than 50 characters",
      "string.pattern.name": "Password should have at least 1 {#name} character"
    }),
});

export type LoginType = {
  email: string;
  password: string;
};

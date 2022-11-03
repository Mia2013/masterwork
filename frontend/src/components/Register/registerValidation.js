import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Az összes mező kitöltése kötelező.",
    "string.empty": "Az összes mező kitöltése kötelező.",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Nem megfelelő email formátum.",
      "string.empty": "Az összes mező kitöltése kötelező.",
      "any.required": "Az összes mező kitöltése kötelező.",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Az összes mező kitöltése kötelező.",
    "string.empty": "Az összes mező kitöltése kötelező.",
    "string.min": "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Kérem ismételje meg a jelszót.",
    "string.empty": "Kérem ismételje meg a jelszót.",
    "any.only": "A beírt jelszavak nem egyeznek.",
  }),
});

export default registerSchema;

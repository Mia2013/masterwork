import Joi from 'joi';

const profileSchema = Joi.object({
      name: Joi.string(),   
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": "Nem megfelelő email formátum.",
        }),
      currentPassword: Joi.string()
      .required()
      .min(8)
      .messages({
        "any.required": "Kérem írja be jelszavát az adatok megváltoztatásához.",
        "string.empty": "Kérem írja be jelszavát az adatok megváltoztatásához.",
        "string.min": "A jelszónak legalább 8 karakter hosszúnak kell lennie.",
      }),
      password: Joi.string()
      .min(8)
      .messages({
        "string.min": "Az új jelszónak legalább 8 karakter hosszúnak kell lennie.",
      }),
      passwordConfirm: Joi.string()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "A beírt jelszavak nem egyeznek.",
      }),
  }).options({ allowUnknown: true });

  export default profileSchema;
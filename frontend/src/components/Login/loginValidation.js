import Joi from 'joi';

const loginSchema = Joi.object({
  password:
      Joi.string()
        .min(8)
        .required()
        .messages({
          'any.required': 'Az összes mező kitöltése kötelező.',
          'string.empty': 'Az összes mező kitöltése kötelező.',
          'string.min': 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
        }),
  email:
      Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Nem megfelelő email formátum.',
          'string.empty': 'Az összes mező kitöltése kötelező.',
          'any.required': 'Az összes mező kitöltése kötelező.',
        }),

});

export default loginSchema;

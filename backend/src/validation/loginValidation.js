import Joi from 'joi';

export const loginValidation = ({ email, password }) => {
  const schema = Joi.object({
    password:
    Joi.string()
      .min(8)
      .required()
      .messages({
        'any.required': 'Az összes mező kitöltése kötelező.',
        'string.empty': 'A jelszó megadása kötelező.',
        'string.min': 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
      }),
    email:
    Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Nem megfelelő email formátum.',
        'string.empty': 'Email cím megadása kötelező.',
        'any.required': 'Az összes mező kitöltése kötelező.',
      }),

  });

  return schema.validate({ email, password });
};

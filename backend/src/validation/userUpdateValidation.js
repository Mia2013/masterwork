import Joi from 'joi';

export const userUpdateValidation = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'string.empty': 'Név megadása kötelező.',
        'any.required': 'Az összes mező kitöltése kötelező.',
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.email': 'Nem megfelelő email formátum.',
        'string.empty': 'Email cím megadása kötelező.',
        'any.required': 'Az összes mező kitöltése kötelező.',
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'any.required': 'Az összes mező kitöltése kötelező.',
        'string.empty': 'A jelszó megadása kötelező.',
        'string.min': 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
      }),
  });

  return schema.validate({ name, email, password });
};

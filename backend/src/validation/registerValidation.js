import Joi from 'joi';

export const registerValidation = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'A felhasználónév kitöltése kötelező' }),
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Az email cím kitötlése kötelező' }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'A jelszó kitöltése kötelező',
        'string.min': 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
      }),
  });

  return schema.validate({ name, email, password });
};

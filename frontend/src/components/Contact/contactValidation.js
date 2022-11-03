import Joi from 'joi';

const contactSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Nem megfelelő email formátum.',
        'string.empty': 'Email cím megadása kötelező.',
        'any.required': 'Az összes mező kitöltése kötelező.',
      }),
    message: Joi.string().required().messages({
      'any.required': 'Az összes mező kitöltése kötelező.',
      'string.empty': 'Az üzenet mező nem lehet üres.',
    }),

    subject: Joi.string().required().messages({
      'any.required': 'Az összes mező kitöltése kötelező.',
      'string.empty': 'Az üzenet mező nem lehet üres.',
    }),
  });

  export default contactSchema;
  
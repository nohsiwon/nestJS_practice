import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  RUNTIME: Joi.string().valid('local', 'test', 'prod').required(),
  PORT: Joi.number().required(),

  //Auth
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRY: Joi.string().required(),
  REFRESH_TOKEN_EXPIRY: Joi.string().required(),

  //DB
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});

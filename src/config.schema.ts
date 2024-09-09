import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  CURRENT_ENV: Joi.string().required(),

  // BASIC AUTH
  BASIC_AUTH_USERNAME: Joi.string().required(),
  BASIC_AUTH_PASSWORD: Joi.string().required(),

  // DATABASE
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.string().default(5432).required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_SCHEMA: Joi.string().required(),
  DB_LOGGING: Joi.boolean().required(),

  // SSO Service
  LOGIN_SSO_ENDPOINT: Joi.string().required(),
  SSO_PRIVATE_KEY_PATH: Joi.string().required(),

  // JWT Config
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_IN_SECONDS: Joi.number().required(),
});

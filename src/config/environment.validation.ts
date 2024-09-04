import * as Joi from 'joi';

/**
 * Define the environment variables schema
 * @description This helps validate .env files
 */
const environmentSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .required()
    .default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_CLOUDFRONT_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().port().default(2525),
  MAIL_FROM: Joi.string().required(),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  PROFILE_API_KEY: Joi.string().required(),
});

export default environmentSchema;

// Validate the environment variables
// const { error } = environmentSchema.validate(process.env);

// Throw an error if validation fails
// if (error) {
//   throw new Error(`Environment validation error: ${error.message}`);
// }

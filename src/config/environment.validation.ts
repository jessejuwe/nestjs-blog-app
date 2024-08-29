import * as Joi from 'joi';

/**
 * Define the environment variables schema
 * @description This helps validate .env files
 * @type {Joi.ObjectSchema}
 * @property {Joi.StringSchema} NODE_ENV - The node environment
 * @property {Joi.NumberSchema} DATABASE_PORT - The database port
 * @property {Joi.StringSchema} DATABASE_HOST - The database host
 * @property {Joi.StringSchema} DATABASE_USER - The database user
 * @property {Joi.StringSchema} DATABASE_PASSWORD - The database password
 * @property {Joi.StringSchema} DATABASE_NAME - The database name
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
  PROFILE_API_KEY: Joi.string().required(),
});

export default environmentSchema;

// Validate the environment variables
// const { error } = environmentSchema.validate(process.env);

// Throw an error if validation fails
// if (error) {
//   throw new Error(`Environment validation error: ${error.message}`);
// }

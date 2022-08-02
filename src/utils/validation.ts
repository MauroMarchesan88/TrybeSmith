import Joi from 'joi';

export default function validateBody(data: object) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}
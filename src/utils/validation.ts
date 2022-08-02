import Joi from 'joi';

export function validateLogin(data: object) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}

export function validateProduct(data: object) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}

export function validateUser(data: object) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().integer().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
}
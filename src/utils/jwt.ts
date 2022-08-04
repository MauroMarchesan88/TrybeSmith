import jwt, { SignOptions } from 'jsonwebtoken';

const options: SignOptions = {
  algorithm: 'HS256',
};

export const createToken = (username: string, password: string) => {
  const token = jwt.sign({ username, password }, 'my_super_secret', options);
  return token;
};

export const validateToken = (token: string) => {
  const userData = jwt.verify(token, 'my_super_secret', options);
  return userData as { username: string };
};

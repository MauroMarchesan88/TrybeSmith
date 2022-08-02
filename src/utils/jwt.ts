import jwt, { SignOptions } from 'jsonwebtoken';

const options: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (username: string, password: string) => {
  const token = jwt.sign({ username, password }, 'my_super_secret', options);
  return token;
};

export default createToken;
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../interfaces/user.interface';

const options: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (user: User) => {
  const token = jwt.sign({ user }, 'my_super_secret', options);
  return token;
};

export default createToken;
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/users.service';
import createToken from '../utils/jwt';

class UserController {
  constructor(private userService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    console.log('xablau');
    const token = createToken({ username, classe, level, password });
    console.log(token);
    const [users] = await this.userService.create({ username, classe, level, password });
    console.log(users);
    res.status(StatusCodes.CREATED).json({ users, token });
  };
}

export default UserController;
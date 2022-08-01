import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/users.service';
import createToken from '../utils/jwt';

class UserController {
  constructor(private userService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = createToken({ username, classe, level, password });
    const [users] = await this.userService.create({ username, classe, level, password });
    res.status(StatusCodes.CREATED).json({ users, token });
  };
}

export default UserController;
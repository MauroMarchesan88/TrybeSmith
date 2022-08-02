import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/users.service';
import createToken from '../utils/jwt';
import { validateUser } from '../utils/validation';

class UserController {
  constructor(private userService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    validateUser({ username, classe, level, password });
    const token = createToken(username, password);
    const [users] = await this.userService.create({ username, classe, level, password });
    res.status(StatusCodes.CREATED).json({ users, token });
  };
}

export default UserController;
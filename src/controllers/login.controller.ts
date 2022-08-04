import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';
import { createToken } from '../utils/jwt';
import { validateLogin } from '../utils/validation';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    validateLogin({ username, password });
    const [userData] = await this.loginService.getByName(username);

    if (!userData || userData.password !== password) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        { message: 'Username or password invalid' },
      );
    }
    
    const token = createToken(username, password);
    res.status(StatusCodes.OK).json({ token });
  };
}

export default LoginController;
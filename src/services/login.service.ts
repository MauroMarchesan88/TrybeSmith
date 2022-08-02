import User from '../interfaces/user.interface';
import connection from '../models/connection';
import LoginModel from '../models/login.model';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async getByName(name: string): Promise<User[]> {
    const user = await this.model.getByName(name);
    return user;
  }
}

export default LoginService;
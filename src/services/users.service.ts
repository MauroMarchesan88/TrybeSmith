import User from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getByName(name: string): Promise<User[]> {
    const user = await this.model.getByName(name);
    return user;
  }

  public async create(user: User): Promise<User[]> {
    const users = await this.model.create(user);
    return [users];
  }
}

export default UserService;
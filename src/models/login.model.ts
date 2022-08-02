import { Pool } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByName(name:string): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE username = ?', [name]);
    const [rows] = result;
    return rows as User[];
  }
}
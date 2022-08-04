import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';
// import UserId from '../interfaces/UserId.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute('SELECT id, userId FROM Trybesmith.Orders ORDER BY userId');
    const [rows] = result;
    return rows as Order[];
  }

  public async getUserId(username: string): Promise<object> {
    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.Users WHERE username = ?', [username]);
    const [rows] = result;
    const [id] = (JSON.parse(JSON.stringify(rows))).map((elem: { id:number }) => elem.id);
    return id;
  }

  public async getProductsByOrderID(orderId: number | undefined): Promise<number[]> {
    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.Products WHERE orderId = ?', [orderId]);
    const [rows] = result;
    const ids = (JSON.parse(JSON.stringify(rows))).map((elem: { id:number }) => elem.id);
    return ids as [];
  }
}
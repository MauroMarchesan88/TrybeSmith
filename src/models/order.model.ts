import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async getUserId(username: string) {
    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.Users WHERE username = ?', [username]);
    const [rows] = result;
    const [id] = (JSON.parse(JSON.stringify(rows))).map((elem: { id:number }) => elem.id);
    return id as number;
  }

  public async getProductsByOrderID(orderId: number | undefined): Promise<number[]> {
    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.Products WHERE orderId = ?', [orderId]);
    const [rows] = result;
    const ids = (JSON.parse(JSON.stringify(rows))).map((elem: { id:number }) => elem.id);
    return ids as [];
  }
    
  public async create(userId: number, productId: number): Promise<object> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    const updated = await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [insertId, productId],
    );
    return updated;
  }
}
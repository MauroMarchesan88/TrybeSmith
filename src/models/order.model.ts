import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    // const query = 'SELECT a.id, a.userId, b.id AS "productsIds" FROM Trybesmith.Orders a INNER JOIN Trybesmith.Products b ON a.id=b.orderId';

    const result = await this.connection
      .execute(
        `SELECT a.id, a.userId,
        b.id AS "productsIds"
      FROM Trybesmith.Orders a 
      INNER JOIN Trybesmith.Products b 
      ON a.id=b.orderId;`,
      );
    const [rows] = result;
    return rows as Order[];
  }
}
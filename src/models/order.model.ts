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
      .execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;
    return rows as Order[];
  }

  public async getProductsByOrderID(orderId: number | undefined): Promise<[]> {
    // const query = 'SELECT a.id, a.userId, b.id AS "productsIds" FROM Trybesmith.Orders a INNER JOIN Trybesmith.Products b ON a.id=b.orderId';

    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.Products WHERE orderId = ?', [orderId]);
    const [rows] = result;
    return rows as [];
  }
}
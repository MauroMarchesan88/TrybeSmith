import Order from '../interfaces/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const Orders = await this.model.getAll();
    return Orders;
  }

  public async getProductsByOrderID(order: Order): Promise<Order[]> {
    const orderId = order.id;
    const products = await this.model.getProductsByOrderID(orderId);
    return products;
  }
}

export default OrderService;
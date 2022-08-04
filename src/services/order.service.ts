import Order from '../interfaces/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';
// import UserModel from '../models/user.model';

class OrderService {
  public model: OrderModel;

  // Adicionado mode2 pura e exclusivamente para um caso de uso, sei que fere
  // os principios do MSC porem acredito que seja mais 'realista' facilitar
  // essa conexão. Sera refatorado a futuro;
  // public model2: UserModel;

  constructor() {
    this.model = new OrderModel(connection);
    // this.model2 = new UserModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const Orders = await this.model.getAll();
    return Orders;
  }

  public async getUserId(username: string): Promise<number> {
    const user = await this.model.getUserId(username);
    return user;
  }

  public async getProductsByOrderID(order: Order): Promise<number[]> {
    const orderId = order.id;
    const products = await this.model.getProductsByOrderID(orderId);
    return products;
  }

  public create = async (userId: number, productsIds: number[]) => {
    const creating = await Promise.all(productsIds.map(async (product) => {
      await this.model.create(userId, product);
    }));
    
    return creating;
  };
}

export default OrderService;
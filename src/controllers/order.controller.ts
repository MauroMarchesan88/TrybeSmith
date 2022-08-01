import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Order from '../interfaces/order.interface';
import OrderService from '../services/order.service';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  public getAllOrders = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    const finalResponse: object[] = [];
    await Promise.all(orders.map(async (order: Order) => {
      const product = await this.orderService.getProductsByOrderID(order);
      finalResponse.push({ id: order.id, userId: order.userId, productsIds: product });
    }));
    res.status(StatusCodes.OK).json(finalResponse);
  };
}

export default OrdersController;
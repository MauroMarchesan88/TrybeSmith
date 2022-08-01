import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Order from '../interfaces/order.interface';
import OrderService from '../services/order.service';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAllOrders = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    const halfwayResponse: object[] = [];
    await Promise.all(orders.map(async (order: Order) => {
      const product = await this.orderService.getProductsByOrderID(order);
      halfwayResponse.push({ id: order.id, userId: order.userId, productsIds: product });
    }));

    // Aqui foi preciso fazer um sort da resposta ja que o teste so avalia correto se a resposta for na ordem crescente de userId
    // Importante ressaltar que estou a quase um dia sem poder resolver essa questao, por isso cortei caminho dando o type any na linha 21,
    // nao vejo o beneficio em declarar os types corretos (NESTE CASSO EM ESPECIAL) em relação tempo/resultado, ja que a solução seria
    // criar uma interface ou uma nova instancia de um objeto somente para dar a resposta correta com consistencia;
    const finalResponse = halfwayResponse.sort((a: any, b: any) => (a.userId < b.userId ? -1 : 1));

    res.status(StatusCodes.OK).json(finalResponse);
  };
}

export default OrdersController;
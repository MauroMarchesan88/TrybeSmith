import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import LoginRoutes from './routes/login.routes';
import OrderRoutes from './routes/orders.routes';
import ProductsRoutes from './routes/products.routes';
import UserRoutes from './routes/users.routes';

const app = express();

app.use(express.json());

app.use(ProductsRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);
app.use(LoginRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;

  switch (name) {
    case 'ValidationError':
      if (message.includes('must be'))res.status(422).json({ message: details[0].message });
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      res.sendStatus(500);
  }
  
  next();
});

export default app;

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';
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
      if (message.includes('must be')) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: details[0].message });
      }
      res.status(StatusCodes.BAD_REQUEST).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    case 'JsonWebTokenError':
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      break;
    default:
      res.sendStatus(500);
  }
  
  next();
});

export default app;

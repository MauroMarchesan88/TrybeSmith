import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/products.service';
import { validateProduct } from '../utils/validation';

class ProductsController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(StatusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    validateProduct({ name, amount });
    const [products] = await this.productService.create({ name, amount });
    res.status(StatusCodes.CREATED).json(products);
  };
}

export default ProductsController;
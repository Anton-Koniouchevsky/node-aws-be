import { Product } from './products';
import { ValidationError } from 'sequelize';
import { initSequelize } from './products-db';
import HandlerError from '../handlerError';


const db = initSequelize();

function getProducts(): Promise<Product[]> {
  return db.ProductModel.findAll({
    include: {
      model: db.StockModel
    }
  });
}

async function getProductById(productId: string): Promise<Product|Error> {
  const result = await db.ProductModel.findByPk(productId, {
    include: {
      model: db.StockModel
    }
  });

  if (!result) {
    throw new HandlerError(404, 'Product Not Found');
  }

  return result;
};

function createProduct(product: Product): Promise<Product|Error> {
  return db.sequelize.transaction(async (t) => {
    try {
      const createdProduct = await db.ProductModel.create(product, { transaction: t });

      if (product.stock) {
        createdProduct.stock = await db.StockModel.create({
          product_id: createdProduct.id,
          ...product.stock,
        }, { transaction: t });
      }
      
      return createdProduct;
    } catch(error) {
      console.log(error);
      if (error instanceof ValidationError) {
        throw new HandlerError(400, error.message);
      }

      throw error;
    }
  });
}

export {
  getProducts,
  getProductById,
  createProduct,
};

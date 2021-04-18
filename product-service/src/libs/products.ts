import { Sequelize, DataTypes, Model, ValidationError } from 'sequelize';
import HandlerError from './handlerError';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
});


interface Stock {
  product_id: string,
  count: number
};

interface Product {
  id?: string,
  title: string,
  description?: string,
  price?: number,
  stock?: Stock,
};

interface ProductInstance extends Model<Product, Product>, Product{}
const ProductModel = sequelize.define<ProductInstance>('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  }
}, {
  tableName: 'products',
  timestamps: false,
});

interface StockInstance extends Model<Stock, Stock>, Stock{}
const StockModel = sequelize.define<StockInstance>('Stock', {
  product_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  count: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'stocks',
  timestamps: false,
});

ProductModel.hasOne(StockModel, {
  foreignKey: 'product_id',
});
StockModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  targetKey: 'id'
});

function getProducts(): Promise<Product[]> {
  return ProductModel.findAll({
    include: {
      model: StockModel
    }
  });
}

async function getProductById(productId: string): Promise<Product|Error> {
  const result = await ProductModel.findByPk(productId, {
    include: {
      model: StockModel
    }
  });

  if (!result) {
    throw new HandlerError(404, 'Product Not Found');
  }

  return result;
};

function createProduct(product: Product): Promise<Product|Error> {
  return sequelize.transaction(async (t) => {
    try {
      const createdProduct = await ProductModel.create(product, { transaction: t });

      if (product.stock) {
        createdProduct.stock = await StockModel.create({
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
  Product,
  getProducts,
  getProductById,
  createProduct,
};

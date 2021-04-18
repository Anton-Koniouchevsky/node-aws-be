const { Sequelize, DataTypes } = require('sequelize');

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

const ProductModel = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'products',
  timestamps: false,
});

const StockModel = sequelize.define('Stock', {
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
  targetKey: 'id'
});
StockModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  targetKey: 'id'
});

interface Stock {
  product_id: string,
  count: number
};

interface Product {
  id: string,
  title: string,
  description: string,
  price: number,
  stock?: Stock,
};

function getProducts(): Promise<Product[]> {
  return ProductModel.findAll({
    include: {
      model: StockModel
    }
  });
}

function getProductById(productId: string): Promise<Product|Error> {
  return ProductModel.findByPk(productId, {
    include: {
      model: StockModel
    }
  });
};

function createProduct(product: Product): Promise<Product> {
  return sequelize.transaction(async (t) => {
    const createdProduct = await ProductModel.create(product, { transaction: t });

    if (product.stock) {
      createdProduct.stock = await StockModel.create({
        product_id: createdProduct.id,
        ...product.stock,
      }, { transaction: t });
    }
    
    return createdProduct;
  });
}

export {
  Product,
  getProducts,
  getProductById,
  createProduct,
};

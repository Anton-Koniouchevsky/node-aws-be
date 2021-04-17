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


interface Product {
  id: string,
  title: string,
  description: string,
  price: number,
};

async function getProducts(): Promise<Product[]> {
  return ProductModel.findAll();
}

async function getProductById(productId: string): Promise<Product|Error> {
  return await ProductModel.findAll({
    where: {
      id: productId
    }
  });
};

export {
  Product,
  getProducts,
  getProductById,
};

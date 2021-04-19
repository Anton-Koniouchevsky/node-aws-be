import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import { Product, Stock } from './products';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

interface ProductInstance extends Model<Product, Product>, Product {}
interface StockInstance extends Model<Stock, Stock>, Stock{}

interface SequelizeProps {
  sequelize: Sequelize,
  ProductModel: ModelCtor<ProductInstance>,
  StockModel: ModelCtor<StockInstance>,
};

export function initSequelize(): SequelizeProps {
  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
  });
  
  
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

  return {
    sequelize,
    ProductModel,
    StockModel,
  };
}
import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceInclude: ['pg']
      }
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      // DB Connection Settings
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_NAME: '${env:DB_NAME}',
      DB_USERNAME: '${env:DB_USERNAME}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
    },
    lambdaHashingVersion: '20201221',
    region: 'eu-west-1',
    stage: 'dev',
  },
  useDotenv: true,
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
  },
};

module.exports = serverlessConfiguration;

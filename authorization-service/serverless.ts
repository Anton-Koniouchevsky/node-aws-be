import type { AWS } from '@serverless/typescript';

import basicAuthorizer from '@functions/basicAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
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
      Anton_Koniouchevsky: '${env:Anton_Koniouchevsky}',
    },
    lambdaHashingVersion: '20201221',
    
    region: 'eu-west-1',
  },
  useDotenv: true,
  // import the function via paths
  functions: { basicAuthorizer },
};

module.exports = serverlessConfiguration;

import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    s3BucketName: 'import-products',
    s3FullBucketName: '${self:custom.s3BucketName}-storage-${opt:stage, self:provider.stage}',
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
      // S3 Settings
      S3_SECRET_KEY: '${env:S3_SECRET_KEY}',
      S3_SECRET_KEY_ID: '${env:S3_SECRET_KEY_ID}',
      S3_REGION: '${env:S3_REGION}',
      S3_BUCKET: '${self:custom.s3FullBucketName}'
    },
    lambdaHashingVersion: '20201221',
    region: 'eu-west-1',
    stage: 'dev',
  },
  useDotenv: true,
  // import the function via paths
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;


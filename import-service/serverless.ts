import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';
import catalogBatchProcess from '@functions/catalogBatchProcess';

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
      S3_BUCKET: '${self:custom.s3FullBucketName}',
      // Products Endpoint
      PRODUCTS_ENDPOINT: '${env:PRODUCTS_ENDPOINT}',
      // SQS Settings
      SQS_URL: {
        Ref: 'SQSQueue'
      },
      // SNS Settings
      SNS_ARN: {
        Ref: 'SNSTopic',
      },
    },
    lambdaHashingVersion: '20201221',
    region: 'eu-west-1',
    stage: 'dev',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: [{
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        }],
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'SNSTopic',
        },
      },
    ],
  },
  useDotenv: true,
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:custom.s3BucketName}-queue-${opt:stage, self:provider.stage}',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: '${self:custom.s3BucketName}-topic-${opt:stage, self:provider.stage}',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:SNS_SUBSCRIPTION_EMAIL}',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
        },
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser, catalogBatchProcess },
};

module.exports = serverlessConfiguration;


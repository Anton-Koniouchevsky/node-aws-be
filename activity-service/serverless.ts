import type { AWS } from '@serverless/typescript';

import getActivity from '@functions/getActivity';

const serverlessConfiguration: AWS = {
  service: 'activity-service',
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
    },
    lambdaHashingVersion: '20201221',
    region: 'eu-west-1',
    stage: 'dev',
  },
  // import the function via paths
  functions: { getActivity },
};

module.exports = serverlessConfiguration;

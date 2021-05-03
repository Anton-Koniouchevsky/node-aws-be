import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';
import { config, S3 } from 'aws-sdk';

const { S3_SECRET_KEY, S3_SECRET_KEY_ID, S3_REGION } = process.env;

config.update({
  secretAccessKey: S3_SECRET_KEY,
  accessKeyId: S3_SECRET_KEY_ID,
  region: S3_REGION,
  signatureVersion: 'v4'
});

export const main: LambdaFunction = (event) => {
  console.log('importProductsFile invoked with event: ', event);

  return tryCatch(async () => {
    const fileName = event?.queryStringParameters?.fileName;

    if (!fileName) {
      throw new Error('file name is not passed');
    }

    const path = `uploaded/${fileName}`;
    const s3 = new S3();
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: path,
    };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return signedUrl;
  });
};

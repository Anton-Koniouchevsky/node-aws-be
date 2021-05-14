import 'source-map-support/register';

import { S3EventLambdaFunction } from '@libs/apiGateway';
import { config, S3 } from 'aws-sdk';
import * as csv from 'csv-parser';

const { S3_SECRET_KEY, S3_SECRET_KEY_ID, S3_REGION } = process.env;

config.update({
  secretAccessKey: S3_SECRET_KEY,
  accessKeyId: S3_SECRET_KEY_ID,
  region: S3_REGION,
  signatureVersion: 'v4'
});


export const main: S3EventLambdaFunction = (event) => {
  console.log('importFileParser invoked with event: ', event);

  const s3 = new S3();

  event.Records.forEach(record => {
    console.log('importFileParser', 'parse record: ', record);

    const bucketName = record.s3.bucket.name;
    const objectKey = record.s3.object.key;

    const s3Stream = s3.getObject({
      Bucket: bucketName,
      Key: objectKey,
    }).createReadStream();

    console.log(s3Stream);

    s3Stream.pipe(csv())
      .on('data', (data) => {
        console.log('importFileParser', 'data', data);
      })
      .on('end', async () => {
        try {
          console.log('importFileParser', 'end');

          await s3.copyObject({
            Bucket: bucketName,
            CopySource: bucketName + '/' + objectKey,
            Key: record.s3.object.key.replace('uploaded', 'parsed'),
          }).promise().then(() => console.log('importFileParser', 'file copied'));
        
          await s3.deleteObject({
            Bucket: bucketName,
            Key: objectKey,
          }).promise().then(() => console.log('importFileParser', 'file deleted'));
        } catch(err) {
          console.log('importFileParser', 'error', err);
        }
      })
      .on('error', (error) => {
        console.log('importFileParser', 'error', error);
      });
  });
};

import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';

import axios from 'axios';
import SNS from 'aws-sdk/clients/sns';
import { Product } from '@libs/product';

const publish = (subject: string, message: string, status: string): void => {
  const sns = new SNS({ region: process.env.S3_REGION });

  sns.publish({
    Subject: subject,
    Message: message,
    TopicArn: process.env.SNS_ARN,
    MessageAttributes: {
      status: {
        DataType: 'String',
        StringValue: status,
      },
    },
  }, function(err, data) {
    if (err) {
      console.log('catalogBatchProcess', 'notification failed: ', err, err.stack);
    } else {
      console.log('catalogBatchProcess', 'notification was sent', data);
    }
  });
};

export const main: SQSHandler = async (event) => {
  console.log('catalogBatchProcess invoked with event: ', event);

  for (const { body } of event.Records) {
    try {
      const { title, description, price, stock } = JSON.parse(body);

      const product: Product = {
        stock: {
          count: stock || 0
        },
        title,
        description,
        price,
      }

      console.log('catalogBatchProcess', 'try to save product into DB', product)
      const result = await axios.post(process.env.PRODUCTS_ENDPOINT, product);

      console.log('catalogBatchProcess', result);
      // notify about success
      publish('Import success', `${body} successfully added`, 'success');
    } catch(err) {
      console.log('catalogBatchProcess', err);
      // notify about error
      publish('Import failure', `${body} was not added`, 'failure');
    }
  }
};

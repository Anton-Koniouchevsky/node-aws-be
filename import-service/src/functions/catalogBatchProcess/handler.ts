import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';

import axios from 'axios';
import { Product } from '@libs/product';

export const main: SQSHandler = (event) => {
  console.log('catalogBatchProcess invoked with event: ', event);

  // parse - post - status -> notify
  event.Records.forEach(async ({ body }) => {
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

    } catch(err) {
      console.log('catalogBatchProcess', err);
      // notify about error
    }
  });
};

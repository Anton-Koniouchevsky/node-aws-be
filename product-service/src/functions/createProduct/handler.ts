import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';
import { createProduct, Product } from '@libs/products';

export const main: LambdaFunction = (event) => {
  console.log('createProduct invoked with event: ', event);

  return tryCatch(() => {
    const product = <Product>JSON.parse(event.body);
    return createProduct(product);
  });
};
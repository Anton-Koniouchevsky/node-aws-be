import 'source-map-support/register';

import { tryCatch, TypedLambdaFunction } from '@libs/apiGateway';
import { createProduct, Product } from '@libs/products';

export const main: TypedLambdaFunction<Product> = async (event) => {
  console.log('createProduct invoked with event: ', event);

  return tryCatch(createProduct, event.body);
};
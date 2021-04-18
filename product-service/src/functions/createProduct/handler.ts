import 'source-map-support/register';

import { tryCatch, TypedLambdaFunction } from '@libs/apiGateway';
import { createProduct, Product } from '@libs/products';

export const main: TypedLambdaFunction<Product> = async (event) => {
  return tryCatch(() => {
    createProduct(event.body);
  });
};
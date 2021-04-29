import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';
import { getProductById } from '@libs/products';


export const main: LambdaFunction = (event) => {
  console.log('getProductsById invoked with event: ', event);

  return tryCatch(() => getProductById(event?.pathParameters?.productId));
};

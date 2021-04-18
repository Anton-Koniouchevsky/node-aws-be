import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';
import { getProducts } from '@libs/products';


export const main: LambdaFunction = () => {
  console.log('getProductsList invoked');

  return tryCatch(getProducts);
};

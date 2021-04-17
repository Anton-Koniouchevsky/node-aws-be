import 'source-map-support/register';

import { tryCatch, LambdaFunction } from '@libs/apiGateway';
import { getProducts } from '@libs/products';


export const getProductsList: LambdaFunction = () => {
  return tryCatch(getProducts);
};

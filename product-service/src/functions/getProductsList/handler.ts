import 'source-map-support/register';

import { formatJSONResponse, LambdaFunction } from '@libs/apiGateway';
import { getProducts } from '@libs/products';


export const getProductsList: LambdaFunction = async () => {
  return formatJSONResponse({ message: getProducts() });
};

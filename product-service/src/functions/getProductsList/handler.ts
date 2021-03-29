import 'source-map-support/register';

import { formatJSONResponse, LambdaFunction } from '@libs/apiGateway';
import { getProducts } from '@libs/products';


export const getProductsList: LambdaFunction = async () => {
  try {
    const products = getProducts();

    return formatJSONResponse({ message: products });
  } catch(err) {
    console.log('getProductsById', err.message);
  
    return formatJSONResponse({ errorMessage: err.message }, 404);
  }
};

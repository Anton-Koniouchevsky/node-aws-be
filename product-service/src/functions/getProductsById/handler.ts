import 'source-map-support/register';

import { formatJSONResponse, LambdaFunction } from '@libs/apiGateway';
import { getProducts, Product } from '@libs/products';


const getProduct = (productId: string): Product | Error => {
  const product = getProducts().find((product) => product.id === productId);

  if (!product) {
    throw new Error('product not found');
  }

  return product;
};

export const getProductsById: LambdaFunction = async (event) => {
  try {
    const product = getProduct(event.pathParameters.productId);

    return formatJSONResponse(product);
  } catch(err) {
    console.log('getProductsById', err.message);
  
    return formatJSONResponse({ errorMessage: err.message }, 404);
  }
};

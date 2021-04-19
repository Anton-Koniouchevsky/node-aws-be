import { main } from './handler';
import products from '@libs/products/products.mock.json';
import * as productsService from '@libs/products';
import HandlerError from '@libs/handlerError';
import { APIGatewayProxyEvent } from 'aws-lambda';

jest.mock('@libs/products/products-service');
const mockedProductsService = productsService as jest.Mocked<typeof productsService>;

describe('#createProduct', () => {
  const event = {
    body: JSON.stringify({}),
  };

  test('should return 200 response', async () => {
    const expected = products[1];
    mockedProductsService.createProduct.mockResolvedValue(expected);
  
    const result = await main(<APIGatewayProxyEvent>event);
  
    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(expected),
    });
  });

  test('should return 400 response if passed object is not a valid product', async () => {
    const expectedErrorMessage = 'Some error';
    mockedProductsService.createProduct.mockRejectedValue(new HandlerError(400, expectedErrorMessage));
  
    const result = await main(<APIGatewayProxyEvent>event);
  
    expect(result).toMatchObject({
      statusCode: 400,
      body: JSON.stringify({ errorMessage: expectedErrorMessage }),
    });
  });

  test('should return 500 response in case of unexpected error', async () => {
    const expectedErrorMessage = 'Some error';
    mockedProductsService.createProduct.mockRejectedValue(new Error(expectedErrorMessage));
  
    const result = await main(<APIGatewayProxyEvent>event);
  
    expect(result).toMatchObject({
      statusCode: 500,
      body: JSON.stringify({ errorMessage: expectedErrorMessage }),
    });
  });
});

import { main } from './handler';
import products from '@libs/products/products.mock.json';
import * as productsService from '@libs/products';
import HandlerError from '@libs/handlerError';

jest.mock('@libs/products/products-service');
const mockedProductsService = productsService as jest.Mocked<typeof productsService>;

describe('#getProductsById', () => {
  test('should return 200 response if product was found', async () => {
    const expected = products[1];
    mockedProductsService.getProductById.mockResolvedValue(expected);

    const result = await main({} as any);

    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(expected),
    });
  });

  test('should return 404 response if product was not found', async () => {
    mockedProductsService.getProductById.mockRejectedValue(new HandlerError(404, 'Product Not Found'));

    const result = await main({} as any);

    expect(result).toMatchObject({
      statusCode: 404,
      body: JSON.stringify({ errorMessage: 'Product Not Found' }),
    });
  });

  test('should return 500 response in case of unexpected errors', async () => {
    mockedProductsService.getProductById.mockRejectedValue(new Error('Some unexpected error'));

    const result = await main({} as any);

    expect(result).toMatchObject({
      statusCode: 500,
      body: JSON.stringify({ errorMessage: 'Some unexpected error' }),
    });
  });
});

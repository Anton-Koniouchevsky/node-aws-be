import { main } from './handler';
import products from '@libs/products/products.mock.json';
import * as productsService from '@libs/products';

jest.mock('@libs/products/products-service');
const mockedProductsService = productsService as jest.Mocked<typeof productsService>;

describe('#getProductsList', () => {
  test('should return 200 response', async () => {
    const expected = products;
    mockedProductsService.getProducts.mockResolvedValue(expected);
  
    const result = await main({} as any);
  
    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(expected),
    });
  });

  test('should return 500 response in case of rejection', async () => {
    const expectedErrorMessage = 'Some error';
    mockedProductsService.getProducts.mockRejectedValue(new Error(expectedErrorMessage));
  
    const result = await main({} as any);
  
    expect(result).toMatchObject({
      statusCode: 500,
      body: JSON.stringify({ errorMessage: expectedErrorMessage }),
    });
  });
});

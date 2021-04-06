import { getProductsById } from './handler';

import { products } from '../../libs/products';

describe('#getProductsById', () => {
  test('should return 200 response if product was found', async () => {
    const expected = products[1];
    const mockEvent = {
      pathParameters: {
        productId: expected.id
      }
    } as any;

    const result = await getProductsById(mockEvent);

    expect(result).toMatchObject({
      statusCode: 200,
      body: JSON.stringify(expected),
    });
  });

  test('should return 404 response if product was not found', async () => {
    const mockEvent = {
      pathParameters: {
        productId: 'fake id'
      }
    } as any;

    const result = await getProductsById(mockEvent);

    expect(result).toMatchObject({
      statusCode: 404,
      body: JSON.stringify({ errorMessage: 'product not found' }),
    });
  });
});

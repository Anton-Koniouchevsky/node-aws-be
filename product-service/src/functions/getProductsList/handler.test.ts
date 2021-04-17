import { getProductsList } from './handler';

import { products } from '../../libs/products';

test('should return 200 response', async () => {
  const expected = products;

  const result = await getProductsList({} as any);

  expect(result).toMatchObject({
    statusCode: 200,
    body: JSON.stringify(expected),
  });
});

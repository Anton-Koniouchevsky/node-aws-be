import { products, getProducts, getProductById } from './products';

describe('#getProducts', () => {
  test('should return all products', () => {
    const result = getProducts();

    expect(result).toEqual(products);
  });
});

describe('#getProductById', () => {
  test('should return item with selected id', () => {
    const expected = products[1];

    const result = getProductById(expected.id);

    expect(result).toEqual(expected);
  });

  test('should return an error if there is no item with this id', () => {
    expect(() => getProductById('fake id')).toThrow('product not found');
  });
});

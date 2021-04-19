interface Stock {
  product_id: string,
  count: number
};

interface Product {
  id?: string,
  title: string,
  description?: string,
  price?: number,
  stock?: Stock,
};

export {
  Stock,
  Product,
};

interface Product {
  id: string,
  title: string,
  authors: string,
  price: number,
  description?: string,
};

const products = [
  {
    id: '1',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    price: 51.99,
  },
  {
    id: '2',
    title: 'Code Complete: A Practical Handbook of Software Construction',
    authors: 'Steve McConnell',
    price: 55.99,
  },
  {
    id: '3',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    authors: 'Robert C. Martin',
    price: 24.99,
  },
  {
    id: '4',
    title: 'Refactoring: Improving the Design of Existing Code',
    authors: 'Martin Fowler',
    price: 38.99,
  },
  {
    id: '5',
    title: 'You Don’t Know JS Yet: Get Started',
    authors: 'Kyle Simpson',
    price: 7.99,
  },
  {
    id: '6',
    title: 'Algorithms',
    authors: 'Robert Sedgewick, Kevin Wayne',
    price: 125.99,
  },
  {
    id: '7',
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    authors: 'Marijn Haverbekedives',
    price: 41.99,
  },
];

function getProducts(): Product[] {
  return products;
}

export {
  Product,
  getProducts,
};

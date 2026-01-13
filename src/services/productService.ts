import { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    price: 799,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    description: 'Comfortable cotton t-shirt for everyday wear',
    category: 'Clothing'
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    description: 'Lightweight running shoes for athletes',
    category: 'Footwear'
  },
  {
    id: '5',
    name: 'Laptop Stand',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    description: 'Ergonomic laptop stand for better posture',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Coffee Mug',
    price: 299,
    image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=300&h=300&fit=crop',
    description: 'Ceramic coffee mug with beautiful design',
    category: 'Home'
  }
];

export const productService = {
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 500);
    });
  },

  searchProducts: (query: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  },

  getProductsByCategory: (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = category === 'All' 
          ? mockProducts 
          : mockProducts.filter(product => product.category === category);
        resolve(filtered);
      }, 300);
    });
  }
};
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  loading: boolean;
}
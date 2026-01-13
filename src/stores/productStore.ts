import { proxy } from 'valtio';
import { ProductState } from '@/types';
import { productService } from '@/services/productService';

export const productStore = proxy<ProductState>({
  products: [],
  filteredProducts: [],
  searchQuery: '',
  selectedCategory: 'All',
  loading: false
});

export const productActions = {
  loadProducts: async () => {
    productStore.loading = true;
    try {
      const products = await productService.getProducts();
      productStore.products = products;
      productStore.filteredProducts = products;
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      productStore.loading = false;
    }
  },

  searchProducts: async (query: string) => {
    productStore.searchQuery = query;
    productStore.loading = true;
    
    try {
      if (query.trim() === '') {
        productStore.filteredProducts = productStore.selectedCategory === 'All' 
          ? productStore.products
          : productStore.products.filter(p => p.category === productStore.selectedCategory);
      } else {
        const results = await productService.searchProducts(query);
        productStore.filteredProducts = productStore.selectedCategory === 'All'
          ? results
          : results.filter(p => p.category === productStore.selectedCategory);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      productStore.loading = false;
    }
  },

  filterByCategory: async (category: string) => {
    productStore.selectedCategory = category;
    productStore.loading = true;
    
    try {
      const filtered = await productService.getProductsByCategory(category);
      productStore.filteredProducts = productStore.searchQuery.trim() === ''
        ? filtered
        : filtered.filter(p => 
            p.name.toLowerCase().includes(productStore.searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(productStore.searchQuery.toLowerCase())
          );
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      productStore.loading = false;
    }
  }
};
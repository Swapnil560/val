import { proxy } from 'valtio';
import { CartState, CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'ecommerce-cart';

const getStoredItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(CART_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

const setStoredItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const removeStoredItems = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
};

const initialState: CartState = {
  items: getStoredItems(),
  total: 0
};

export const cartStore = proxy(initialState);

const updateTotal = () => {
  cartStore.total = cartStore.items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity), 
    0
  );
};

// Initialize total
updateTotal();

export const cartActions = {
  addItem: (product: Product) => {
    console.log('Adding to cart:', product.name);
    const existingItem = cartStore.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartStore.items.push({ product, quantity: 1 });
    }
    
    updateTotal();
    setStoredItems(cartStore.items);
    console.log('Cart items:', cartStore.items.length);
  },

  removeItem: (productId: string) => {
    const index = cartStore.items.findIndex(item => item.product.id === productId);
    if (index > -1) {
      cartStore.items.splice(index, 1);
      updateTotal();
      setStoredItems(cartStore.items);
    }
  },

  updateQuantity: (productId: string, quantity: number) => {
    const item = cartStore.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        cartActions.removeItem(productId);
      } else {
        item.quantity = quantity;
        updateTotal();
        setStoredItems(cartStore.items);
      }
    }
  },

  clearCart: () => {
    cartStore.items = [];
    cartStore.total = 0;
    removeStoredItems();
  }
};
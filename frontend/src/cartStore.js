import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false, 

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  // Función para añadir 
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);

    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      };
    }

    return { 
      cart: [...state.cart, { ...product, quantity: 1 }] 
    };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  cartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  clearCart: () => set({ cart: [] }),
}));
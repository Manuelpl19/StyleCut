import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false, 

  // Acciones para abrir/cerrar manualmente
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  // Función para añadir (AHORA SIN ABRIR EL CARRITO)
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);

    if (existingItem) {
      // Si ya existe, sumamos +1 pero NO abrimos el carrito
      return {
        cart: state.cart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
        // Hemos quitado "isOpen: true" de aquí
      };
    }

    // Si es nuevo, lo añadimos pero NO abrimos el carrito
    return { 
      cart: [...state.cart, { ...product, quantity: 1 }] 
      // Hemos quitado "isOpen: true" de aquí también
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
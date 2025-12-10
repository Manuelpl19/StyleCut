import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from './cartStore';

export default function CartDrawer() {
  // Sacamos todo lo que necesitamos del store
  const { 
    cart, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    addToCart, // Reusamos addToCart para sumar +1
    cartTotal 
  } = useCartStore();

  // Función para restar cantidad (un poco de lógica extra)
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      // Truco: Accedemos directamente al estado para actualizar (puedes crear una acción específica si prefieres)
      useCartStore.setState((state) => ({
        cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)
      }));
    } else {
      removeFromCart(item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      ></div>

      {/* Panel Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Tu Cesta</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
              {cart.length} items
            </span>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag size={64} className="text-gray-300" />
              <p className="text-lg font-medium">Tu cesta está vacía</p>
              <button onClick={closeCart} className="text-indigo-600 font-bold hover:underline">
                Volver a la tienda
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Imagen Mini */}
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                      <button onClick={() => decreaseQuantity(item)} className="p-1 hover:text-indigo-600">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1 hover:text-indigo-600">
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Total y Checkout) */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p className="text-xl">${cartTotal().toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              Impuestos y envío calculados en el pago.
            </p>
            <button
              className="w-full flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Tramitar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
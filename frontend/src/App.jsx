import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, Scissors } from 'lucide-react';
import { useCartStore } from './cartStore';
import CartDrawer from './CartDrawer'; // <--- Importamos la ventana del carrito

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sacamos las funciones del store (incluyendo openCart)
  const { cart, addToCart, openCart } = useCartStore();

  // Calculamos el número total de productos para la burbuja roja
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const API_URL = 'http://127.0.0.1:8000/api/products';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      
      {/* --- AQUÍ INSERTAMOS EL COMPONENTE DEL CARRITO --- */}
      {/* Se mantendrá oculto hasta que isOpen sea true en el store */}
      <CartDrawer />

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-lg text-white">
              <Scissors size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">StyleCut.</span>
          </div>
          
          {/* BOTÓN DEL CARRITO (Ahora abre el panel lateral) */}
          <button 
            onClick={openCart} 
            className="group flex items-center gap-3 bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:border-black transition-all duration-300 relative"
          >
            <div className="relative">
              <ShoppingBag size={20} className="text-gray-600 group-hover:text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="font-medium text-sm hidden sm:block">
              Mi Cesta
            </span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="bg-black text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Productos Premium</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Selección exclusiva de productos para el cuidado del cabello y barba.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100">
                
                {/* Imagen */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    {product.stock} en stock
                  </div>
                </div>

                {/* Info */}
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h2>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-1.5 py-0.5 rounded">
                      <Star size={10} fill="currentColor" /> 5.0
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  {/* Precio y Botón */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase">Precio</p>
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    </div>
                    
                    {/* Botón de Añadir (Suma al carrito y abre el panel) */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-gray-200 hover:shadow-indigo-200"
                    >
                      Añadir +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
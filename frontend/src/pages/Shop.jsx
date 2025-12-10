import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useCartStore } from '../cartStore';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const API_URL = 'http://127.0.0.1:8000/api/products';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Tienda Oficial</h1>
        <p className="text-gray-500">Productos premium utilizados por nuestros barberos.</p>
      </div>

      {loading ? (
        <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">{product.stock} stock</div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-1.5 py-0.5 rounded"><Star size={10} fill="currentColor" /> 5.0</div>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all shadow-lg">Añadir +</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
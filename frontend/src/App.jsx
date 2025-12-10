import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Scissors, Calendar } from 'lucide-react';
import { useCartStore } from './cartStore';
import CartDrawer from './CartDrawer';

// Páginas
import Home from './pages/Home';
import Shop from './pages/Shop';
import Booking from './pages/Booking';

// Componente Navbar separado para usar hooks del router
function Navbar() {
  const { cart, openCart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation(); // Para saber en qué página estamos

  const isActive = (path) => location.pathname === path ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-black hover:bg-gray-50";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-black p-2 rounded-lg text-white group-hover:bg-indigo-600 transition-colors">
            <Scissors size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">StyleCut.</span>
        </Link>

        {/* Menú Central */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className={`px-4 py-2 rounded-full font-medium transition-all ${isActive('/')}`}>Inicio</Link>
          <Link to="/shop" className={`px-4 py-2 rounded-full font-medium transition-all ${isActive('/shop')}`}>Tienda</Link>
          <Link to="/book" className={`px-4 py-2 rounded-full font-medium transition-all ${isActive('/book')}`}>Reservas</Link>
        </div>
        
        {/* Botón Carrito */}
        <button 
          onClick={openCart} 
          className="relative group p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingBag size={24} className="text-gray-700 group-hover:text-black" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white animate-bounce shadow-sm border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <CartDrawer />
        <Navbar />
        
        {/* AQUÍ CAMBIA EL CONTENIDO */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/book" element={<Booking />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
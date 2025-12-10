import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Calendar, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-black text-white py-24 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          ESTILO <span className="text-indigo-500">Y</span> CORTE.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Más que una barbería, una experiencia. Reserva tu cita o compra los productos que usamos los profesionales.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/book" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center gap-2">
            <Calendar size={20} /> Reservar Cita
          </Link>
          <Link to="/shop" className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
            <ShoppingBag size={20} /> Ver Tienda
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto py-20 px-4 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Scissors size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Cortes Clásicos</h3>
          <p className="text-gray-500">Maestros de la vieja escuela con técnicas modernas.</p>
        </div>
        {/* Puedes añadir más features aquí */}
      </div>
    </div>
  );
}
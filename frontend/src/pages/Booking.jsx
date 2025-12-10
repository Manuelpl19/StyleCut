import React from 'react';

export default function Booking() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Reserva tu Cita</h1>
      <p className="text-gray-500 mb-8">Nuestro sistema de calendario estará disponible muy pronto.</p>
      <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
        <span className="text-indigo-600 font-bold">🚧 En Construcción</span>
      </div>
    </div>
  );
}
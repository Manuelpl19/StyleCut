import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Scissors, CheckCircle, XCircle } from 'lucide-react';

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pedimos la lista al cargar
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Panel de Administración</h1>
        <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold">
          {appointments.length} Citas Totales
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center h-64 items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Fecha y Hora</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Servicio</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Precio</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((cita) => (
                  <tr key={cita.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 flex items-center gap-2">
                          <Calendar size={14} /> {cita.date}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                          <Clock size={14} /> {cita.start_time.substring(0, 5)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{cita.user?.name || 'Invitado'}</p>
                          <p className="text-xs text-gray-400">{cita.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Scissors size={16} />
                        {cita.service?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">
                      ${cita.service?.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} /> Confirmada
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {appointments.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No hay citas registradas todavía.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Clock, Check, Scissors, ChevronRight, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';

export default function Booking() {
  // Estados para cada paso del proceso
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selección del usuario
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // 1. Cargar Servicios al inicio
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // 2. Cargar Horas cuando cambia la fecha o el servicio
  useEffect(() => {
    if (selectedService && selectedDate) {
      setLoadingSlots(true);
      setAvailableSlots([]); // Limpiar anteriores
      
      // Llamada a tu API nueva
      fetch(`http://127.0.0.1:8000/api/slots?date=${selectedDate}&service_id=${selectedService.id}`)
        .then(res => res.json())
        .then(data => {
          setAvailableSlots(data);
          setLoadingSlots(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingSlots(false);
        });
    }
  }, [selectedDate, selectedService]);

  // Función para manejar el "Confirmar"
  // Función para guardar en la BD
  const handleBooking = async () => {
    // Validar antes de enviar
    if (!selectedService || !selectedDate || !selectedTime) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: selectedService.id,
          date: selectedDate,
          time: selectedTime
        })
      });

      const data = await response.json();

      if (response.ok) {
        // ÉXITO
        alert("✅ ¡Cita guardada correctamente en la Base de Datos!");
        // Opcional: Redirigir al inicio o limpiar
        window.location.href = '/'; 
      } else {
        // ERROR (Ej: Hueco ocupado)
        alert("❌ Error: " + (data.error || "No se pudo guardar"));
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error conectando con el servidor");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Reserva tu Cita</h1>
        <p className="text-gray-500">Configura tu experiencia en 3 pasos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: Servicios */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Elige Servicio
          </h2>
          
          {loading ? (
            <div className="animate-pulse bg-gray-100 h-32 rounded-xl"></div>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setSelectedTime(null); // Resetear hora si cambia servicio
                  }}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group
                    ${selectedService?.id === service.id 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-100 hover:border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${selectedService?.id === service.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <Scissors size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{service.name}</h3>
                      <div className="flex gap-3 text-xs text-gray-500 font-medium">
                        <span>{service.duration_minutes} min</span>
                        <span className="text-indigo-600">${service.price}</span>
                      </div>
                    </div>
                  </div>
                  {selectedService?.id === service.id && <Check size={20} className="text-indigo-600" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Calendario y Hora (Se activa al elegir servicio) */}
        <div className={`space-y-6 transition-opacity duration-500 ${selectedService ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          
          {/* Selector de Fecha */}
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Elige Día
            </h2>
            <div className="relative">
              <input 
                type="date" 
                className="w-full p-4 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-black outline-none"
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // No permitir días pasados
              />
              <CalendarIcon className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Grid de Horas (Solo si hay fecha) */}
          {selectedDate && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Elige Hora
              </h2>
              
              {loadingSlots ? (
                <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div></div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.length > 0 ? availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 px-1 rounded-lg text-sm font-bold transition-all
                        ${selectedTime === time 
                          ? 'bg-black text-white shadow-lg scale-105' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                        }
                      `}
                    >
                      {time}
                    </button>
                  )) : (
                    <p className="col-span-3 text-center text-gray-400 text-sm py-4">No hay huecos disponibles.</p>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* BARRA FLOTANTE DE CONFIRMACIÓN */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 transform
        ${selectedTime ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Resumen</p>
            <p className="text-gray-900 font-bold">
              {selectedService?.name} • {selectedDate} • {selectedTime}
            </p>
          </div>
          <button 
            onClick={handleBooking}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            Confirmar Reserva <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
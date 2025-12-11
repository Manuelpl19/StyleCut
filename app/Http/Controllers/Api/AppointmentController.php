<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Appointment; 

class AppointmentController extends Controller
{

    public function index()
    {
        // Traemos las citas con los datos del usuario y servicio relacionados
        // Ordenadas por fecha y hora
        $appointments = Appointment::with(['user', 'service'])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json($appointments);
    }

    public function getAvailableSlots(Request $request)
    {
        // 1. Recibimos fecha y servicio
        $date = $request->input('date'); 
        $serviceId = $request->input('service_id');

        $service = Service::find($serviceId);
        
        if (!$service || !$date) {
            return response()->json(['error' => 'Datos inválidos'], 400);
        }

        // 2. Definimos horario de apertura (Ej: 10:00 a 20:00)
        $startOfDay = Carbon::parse("$date 10:00:00");
        $endOfDay = Carbon::parse("$date 20:00:00");

        $slots = [];
        $currentSlot = $startOfDay->copy();

        // 3. Generamos los huecos
        while ($currentSlot->copy()->addMinutes($service->duration_minutes) <= $endOfDay) {
            $slots[] = $currentSlot->format('H:i');
            $currentSlot->addMinutes($service->duration_minutes);
        }

        return response()->json($slots);
    }


    public function store(Request $request)
    {
        // 1. Validar que nos envían todo bien
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required', // Formato HH:MM
        ]);

        // 2. Comprobar si YA existe una cita a esa hora (Doble seguridad)
        $exists = Appointment::where('date', $request->date)
                             ->where('start_time', $request->time)
                             ->exists();

        if ($exists) {
            return response()->json(['error' => 'Lo sentimos, ese hueco acaba de ocuparse.'], 409);
        }

        // 3. Crear la reserva
        $appointment = Appointment::create([
            'user_id' => 1, // Usamos el cliente genérico que acabamos de crear
            'service_id' => $request->service_id,
            'date' => $request->date,
            'start_time' => $request->time,
            'status' => 'confirmed' // La confirmamos directamente
        ]);

        return response()->json([
            'message' => 'Reserva creada con éxito',
            'appointment' => $appointment
        ], 201);
    }
} 

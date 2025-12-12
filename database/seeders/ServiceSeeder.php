<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    // Servicio 1
    \App\Models\Service::create([
        'name' => 'Corte Clásico',
        'description' => 'Corte tradicional a tijera o máquina con lavado incluido.',
        'price' => 20.00,
        'duration_minutes' => 30,
        'is_active' => true
    ]);

    // Servicio 2
    \App\Models\Service::create([
        'name' => 'Arreglo de Barba',
        'description' => 'Perfilado a navaja, rebajado y tratamiento con aceites calientes.',
        'price' => 15.00,
        'duration_minutes' => 15,
        'is_active' => true
    ]);

    // Servicio 3
    \App\Models\Service::create([
        'name' => 'Experiencia Completa',
        'description' => 'Corte de pelo + Arreglo de barba + Masaje capilar.',
        'price' => 32.00,
        'duration_minutes' => 45,
        'is_active' => true
    ]);
}
}

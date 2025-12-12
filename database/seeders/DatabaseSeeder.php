<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear el Usuario Principal (Fijo, sin usar fake)
        // Usamos firstOrCreate para que no falle si ya existe
        User::firstOrCreate(
            ['email' => 'cliente@stylecut.com'],
            [
                'name' => 'Cliente VIP',
                'password' => bcrypt('123456'), // Contraseña segura
                'email_verified_at' => now(),
            ]
        );

        // 2. Llamar a los otros seeders de productos y servicios
        $this->call([
            ProductSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
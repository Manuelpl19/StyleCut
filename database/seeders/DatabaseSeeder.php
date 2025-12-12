<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear el Usuario Principal
        User::firstOrCreate(
            ['email' => 'cliente@stylecut.com'],
            [
                'name' => 'Cliente VIP',
                'password' => bcrypt('123456'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            ProductSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
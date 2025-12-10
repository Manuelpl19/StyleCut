<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Producto 1: Cera (Foto de un tarro cosmético negro - VERIFICADO)
        \App\Models\Product::create([
            'name' => 'Cera Mate Premium',
            'description' => 'Fijación fuerte con acabado natural y mate. Ideal para estilos texturizados y modernos.',
            'price' => 15.99,
            'stock' => 50,
            // Esta URL es de un bote negro sobre fondo oscuro
            'image_url' => 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80'
        ]);

        // Producto 2: Aceite (Esta ya salía bien)
        \App\Models\Product::create([
            'name' => 'Aceite para Barba',
            'description' => 'Hidratación profunda con aceites esenciales. Suaviza la barba y cuida la piel.',
            'price' => 12.50,
            'stock' => 30,
            'image_url' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
        ]);
    }
}

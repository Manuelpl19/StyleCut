<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup-database', function () {
    try {
        // 1. Ejecutar las Migraciones (Crear tablas)
        Artisan::call('migrate --force');
        $migracion = Artisan::output();

        // 2. Ejecutar Seeder de Productos
        Artisan::call('db:seed', [
            '--class' => 'ProductSeeder',
            '--force' => true
        ]);
        $productos = Artisan::output();

        // 3. Ejecutar Seeder de Servicios
        Artisan::call('db:seed', [
            '--class' => 'ServiceSeeder',
            '--force' => true
        ]);
        $servicios = Artisan::output();

        return "<h1>¡Éxito! Base de datos configurada.</h1><pre>$migracion \n $productos \n $servicios</pre>";

    } catch (\Exception $e) {
        return "<h1>Error :(</h1><p>" . $e->getMessage() . "</p>";
    }
});
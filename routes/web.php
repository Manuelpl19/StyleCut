<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-db', function () {
    try {
        // 1. BORRAR Y RECREAR TODO (Limpia duplicados)
        Artisan::call('migrate:fresh --seed --force');
        
        // 2. Limpiar cachés por si acaso
        Artisan::call('config:clear');
        Artisan::call('cache:clear');

        return "<h1>✨ Base de Datos Reiniciada ✨</h1>
                <p>Todo está limpio. Ya no hay duplicados.</p>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup-database', function () {
    try {
        // 1. FORZAR LIMPIEZA DE CACHÉ (Lo más importante)
        Artisan::call('config:clear');
        Artisan::call('cache:clear');

        // 2. DIAGNÓSTICO: ¿Qué datos tienes?
        $host = config('database.connections.pgsql.host');
        $port = config('database.connections.pgsql.port');
        $database = config('database.connections.pgsql.database');
        
        // Si el host sigue siendo 127.0.0.1, paramos y avisamos
        if ($host == '127.0.0.1') {
            return "<h1>⚠️ ERROR CRÍTICO</h1>
                    <p>Laravel sigue leyendo <b>127.0.0.1</b>.</p>
                    <p>Esto significa que no está detectando la variable de entorno <code>DB_HOST</code> en Render.</p>
                    <p>Por favor, revisa en Render que la variable se llame EXACTAMENTE <code>DB_HOST</code> (sin espacios al final).</p>";
        }

        // 3. Si el host parece correcto, intentamos migrar
        Artisan::call('migrate --force');
        $migracion = Artisan::output();

        Artisan::call('db:seed', ['--class' => 'ProductSeeder', '--force' => true]);
        $productos = Artisan::output();

        Artisan::call('db:seed', ['--class' => 'ServiceSeeder', '--force' => true]);
        $servicios = Artisan::output();

        return "<h1>¡ÉXITO TOTAL! 🎉</h1>
                <p>Conectado a: <b>$host</b></p>
                <pre>$migracion \n $productos \n $servicios</pre>";

    } catch (\Exception $e) {
        // Mostrar error detallado
        return "<h1>Error :(</h1>
                <p>Intentando conectar a: <b>" . config('database.connections.pgsql.host') . "</b></p>
                <p>Mensaje: " . $e->getMessage() . "</p>";
    }
});
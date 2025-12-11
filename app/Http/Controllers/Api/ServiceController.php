<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        // Devuelve solo los servicios que estén activos
        return response()->json(Service::where('is_active', true)->get());
    }
}
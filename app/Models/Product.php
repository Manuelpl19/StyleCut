<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Estos son los campos que permitimos guardar
    protected $fillable = [
        'name', 
        'description', 
        'price', 
        'stock', 
        'image_url'
    ];
}

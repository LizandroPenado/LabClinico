<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilegios extends Model
{
    use HasFactory;
    protected $fillable = ['id_privilegio', 'nombre', 'descripcion', 'rol_id'];
}

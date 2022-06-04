<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Muestra extends Model
{
    use HasFactory;
    protected $fillable = ['id_muestra', 'codigo_muestra', 'identificacion_paciente', 'tipo_muestra', 'id_ordenexamen'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_empleado', 'nombre_empleado', 'apellido_empleado', 'profesion', 'numero_junta',
        'correo_empleado', 'telefono_empleado', 'sexo_empleado', 'codigo_empleado',
        'direccion_empleado', 'clinica_id', 'municipio_id', 'usuario_id'
    ];
}

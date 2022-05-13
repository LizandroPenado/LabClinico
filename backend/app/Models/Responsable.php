<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Responsable extends Model
{
    use HasFactory;
    protected $fillable = ['id_responsable', 'nombre_responsable', 'apellido_responsable', 'correo_responsable', 'identificacion_res', 'tipo_identificacion_res', 'fecha_nacimiento_res', 'telefono_res'];

}

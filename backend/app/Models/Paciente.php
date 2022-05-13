<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;
    protected $fillable = ['id_paciente', 'nombre_paciente', 'apellido_paciente', 'fecha_nacimiento', 'sexo_paciente', 'direccion_paciente', 'correo_paciente', 'estado_civil', 'identificacion_pac', 'tipo_identificacion_pac', 'nacionalidad_pac', 'municipio_id', 'responsable_id'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoExamen extends Model
{
    use HasFactory;
    protected $fillable = ['id_tipoexamen', 'nombre_tipo_exam', 'descripcion_tipo_exam', 'codigo_tipo_examen', 'tipomuestra_id'];
}

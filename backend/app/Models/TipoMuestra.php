<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMuestra extends Model
{
    use HasFactory;
    protected $fillable = ['id_tipomuestra', 'nombre_tipo_mues', 'descripcion_tipo_mues', 'codigo_tipo_muestra'];
}

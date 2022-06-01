<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinica extends Model
{
    use HasFactory;
    protected $fillable = ['id_clinica', 'nombre_clinica', 'direccion_clinica', 'codigo_clinica', 'municipio_id'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdenExamenes extends Model
{
    use HasFactory;
    protected $fillable = ['id_ordenexamen', 'fecha_orden', 'hora', 'tipoexamen_id'];
}

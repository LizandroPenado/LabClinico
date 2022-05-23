<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatoDemografico extends Model
{
    use HasFactory;
    protected $fillable = ['id_demografico', 'genero', 'estado', 'edad'];
}

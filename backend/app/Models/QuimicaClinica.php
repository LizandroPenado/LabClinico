<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuimicaClinica extends Model
{
    use HasFactory;
    protected $fillable = ['id_quimica', 'glucosa_quimica', 'colesterol', 'trigliceridos', 'acido_urico', 'refquimica_id'];
}

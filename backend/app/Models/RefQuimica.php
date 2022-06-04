<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefQuimica extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_refquimica', 'glucosa_min', 'glucosa_max', 'colesterol_normal', 'trigliceridos_min', 
        'trigliceridos_max', 'acido_id'
    ];  
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefUrianalisis extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_refurianalisis', 'ph_min', 'ph_max', 'densidad_min', 'densidad_max', 'leucocitos_normal', 'nitrito_normal', 'proteina_normal', 
        'glucosa_normal', 'cuerpos_centonicos_normal', 'urobilogeno_normal', 'bilirrubina_normal', 'sangre_normal', 'celulas_escamosas_normal',
        'celulas_redondas_normal', 'cilindros_normal', 'cristales_normal', 'parasitos_normal', 'mucoides_normal', 'bacterias_normal', 
        'globulos_rojos_normal', 'levadura_normal'
    ];    
}

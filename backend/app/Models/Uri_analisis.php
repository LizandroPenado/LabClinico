<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uri_analisis extends Model
{
    use HasFactory;
    protected $fillable = ['id_urianalisis', 'leucocitos_uri', 'nitritos', 'proteina', 'glucosa_uri', 'cuerpos_centonicos', 'urobilogeno', 'bilirrubina', 'sangre_uri', 'globulos_rojos', 'levadura_uri', 'refurianalisis_id'];
}

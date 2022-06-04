<?php

namespace App\Http\Controllers;

use App\Models\RefUrianalisis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefUrianalisisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $user = $request->get('id');
        //$id_clinica = 0;

        $ref_urianalisis = DB::table('ref_urianalisis')
            ->select('ref_urianalisis.id_refurianalisis', 
                     'ref_urianalisis.ph_min', 'ref_urianalisis.ph_max', 
                     'ref_urianalisis.densidad_min', 'ref_urianalisis.densidad_max', 'ref_urianalisis.leucocitos_normal', 
                     'ref_urianalisis.nitrito_normal', 'ref_urianalisis.proteina_normal', 
                     'ref_urianalisis.glucosa_normal', 'ref_urianalisis.cuerpos_centonicos_normal', 'ref_urianalisis.urobilogeno_normal', 
                     'ref_urianalisis.bilirrubina_normal', 'ref_urianalisis.sangre_normal', 'ref_urianalisis.celulas_escamosas_normal',
                     'ref_urianalisis.celulas_redondas_normal', 'ref_urianalisis.cilindros_normal', 'ref_urianalisis.cristales_normal', 
                     'ref_urianalisis.parasitos_normal', 'ref_urianalisis.mucoides_normal', 'ref_urianalisis.bacterias_normal', 
                     'ref_urianalisis.globulos_rojos_normal', 'ref_urianalisis.levadura_normal')
            ->get();

        return $ref_urianalisis;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_expediente
     * @return \Illuminate\Http\Response
     */
    public function show($id_expediente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id_expediente
     * @return \Illuminate\Http\Response
     */
    public function edit($id_expediente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'ph_min' => 'required','ph_max' => 'required',
            'densidad_min' => 'required', 'densidad_max' => 'required',
            'leucocitos_normal' => 'required', 'nitrito_normal' => 'required',
            'proteina_normal' => 'required', 'glucosa_normal' => 'required',
            'cuerpos_centonicos_normal' => 'required', 'urobilogeno_normal' => 'required',
            'bilirrubina_normal' => 'required', 'sangre_normal' => 'required',
            'celulas_escamosas_normal' => 'required', 'celulas_redondas_normal' => 'required',
            'cilindros_normal' => 'required', 'cristales_normal' => 'required',
            'parasitos_normal' => 'required', 'mucoides_normal' => 'required',
            'bacterias_normal' => 'required', 'globulos_rojos_normal' => 'required',
            'levadura_normal' => 'required'
        ], [
            'ph_min.required' => 'El ph minimo es requerido.', 'ph_max.required' => 'El ph maximo es requerido.',
            'densidad_min.required' => 'La densidad minima es requerido.','densidad_max.required' => 'La densidad maxima es requerido.',
            'leucocitos_normal.required' => 'El  es requerido.', 'nitrito_normal.required' => 'El  es requerido.',
            'proteina_normal.required' => 'El  es requerido.', 'glucosa_normal.required' => 'El  es requerido.',
            'cuerpos_centonicos_normal.required' => 'El  es requerido.', 'urobilogeno_normal.required' => 'El  es requerido.',
            'bilirrubina_normal.required' => 'El  es requerido.', 'sangre_normal.required' => 'El  es requerido.',
            'celulas_escamosas_normal.required' => 'El  es requerido.', 'celulas_redondas_normal.required' => 'El  es requerido.',
            'cilindros_normal.required' => 'El  es requerido.', 'cristales_normal.required' => 'El  es requerido.',
            'parasitos_normal.required' => 'El  es requerido.', 'mucoides_normal.required' => 'El  es requerido.',
            'bacterias_normal.required' => 'El  es requerido.', 'globulos_rojos_normal.required' => 'El  es requerido.',
            'levadura_normal.required' => 'El  es requerido.'
        ]);

        $act_ref = DB::table('ref_urianalisis')
            ->where('id_refurianalisis', $request->id_refurianalisis)
            ->update(['ph_min' => $validatedData['ph_min'], 'ph_max' => $validatedData['ph_max'],
                      'densidad_min' => $validatedData['densidad_min'], 'densidad_max' => $validatedData['densidad_max'],
                      'leucocitos_normal' => $validatedData['leucocitos_normal'], 'nitrito_normal' => $validatedData['nitrito_normal'],
                      'proteina_normal' => $validatedData['proteina_normal'], 'glucosa_normal' => $validatedData['glucosa_normal'],
                      'cuerpos_centonicos_normal' => $validatedData['cuerpos_centonicos_normal'], 'urobilogeno_normal' => $validatedData['urobilogeno_normal'],
                      'bilirrubina_normal' => $validatedData['bilirrubina_normal'], 'sangre_normal' => $validatedData['sangre_normal'],
                      'celulas_escamosas_normal' => $validatedData['celulas_escamosas_normal'], 'celulas_redondas_normal' => $validatedData['celulas_redondas_normal'],
                      'cilindros_normal' => $validatedData['cilindros_normal'], 'cristales_normal' => $validatedData['cristales_normal'],
                      'parasitos_normal' => $validatedData['parasitos_normal'], 'mucoides_normal' => $validatedData['mucoides_normal'],
                      'bacterias_normal' => $validatedData['bacterias_normal'], 'globulos_rojos_normal' => $validatedData['globulos_rojos_normal'],
                      'levadura_normal' => $validatedData['levadura_normal']
                     
                     ]
                    );
            return $act_ref;       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }

    public function filtroClinica(Request $request)
    {

    } 

}

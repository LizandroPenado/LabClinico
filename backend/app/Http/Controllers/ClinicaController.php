<?php

namespace App\Http\Controllers;

use App\Models\Clinica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClinicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clinica = DB::table('clinicas')
            ->join('municipios', 'municipios.id_municipio', '=', 'clinicas.municipio_id')
            ->join('departamentos', 'departamentos.id_departamento', '=', 'municipios.departamento_id')
            ->select('clinicas.id_clinica', 'clinicas.nombre_clinica', 'clinicas.direccion_clinica', 'clinicas.codigo_clinica', 'municipios.id_municipio', 'municipios.nombre_mun', 'departamentos.id_departamento', 'departamentos.nombre_dep')
            ->get();

        return $clinica;
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
        $validatedData = $request->validate([
            'nombre_clinica' => 'required|max:25',
            'direccion_clinica' => 'required|max:100',
            'codigo_clinica' => 'required|max:5',
            'id_municipio' => 'required',
        ], [
            'nombre_clinica.required' => 'El nopmbre es requerido.',
            'direccion_clinica.required' => 'La direccion es requerido.',
            'codigo_clinica.required' => 'El codigo es requerido.',
            'id_municipio.required' => 'El municipio es requerido.',
        ]);

        DB::insert(
            'insert into clinicas (nombre_clinica,direccion_clinica,codigo_clinica, municipio_id) values (?, ?, ?, ?)',
            [$validatedData['nombre_clinica'], $validatedData['direccion_clinica'], $validatedData['codigo_clinica'], $validatedData['id_municipio']]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre_clinica' => 'required|max:25',
            'direccion_clinica' => 'required|max:100',
            'codigo_clinica' => 'required|max:5',
            'id_municipio' => 'required',
        ], [
            'nombre_clinica.required' => 'El nopmbre es requerido.',
            'direccion_clinica.required' => 'La direccion es requerido.',
            'codigo_clinica.required' => 'El codigo es requerido.',
            'id_municipio.required' => 'El municipio es requerido.',
        ]);

        $act_clinica = DB::table('clinicas')
            ->where('id_clinica', $request->id_clinica)
            ->update(['nombre_clinica' => $validatedData['nombre_clinica'], 'direccion_clinica' => $validatedData['direccion_clinica'], 'codigo_clinica' => $validatedData['codigo_clinica'], 'municipio_id' => $validatedData['id_municipio']]);
        return $act_clinica;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $clinica= new Clinica();
        $clinica = DB::table('clinicas')->where('id_clinica', $id)->delete();
        return $clinica;
    }
}

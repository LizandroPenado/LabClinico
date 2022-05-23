<?php

namespace App\Http\Controllers;

use App\Models\DatoDemografico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DatoDemograficoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //FALTA CALCULAR LA EDAD DEPENDIENDO DEL AÑO DE NACIMIENTO (VER FORMATO DATE DE ORACLE)
        $edad = 10;
        $demografico = new DatoDemografico();
        $demografico->genero = $request->get('sexo');
        $demografico->estado_civil = $request->get('estado_civil');
        $demografico->edad = $request->get('anio');

        DB::insert(
            'insert into dato_demograficos (genero,estado_civil,edad) values (?, ?, ?)',
            [$demografico->genero, $demografico->estado_civil,  $demografico->edad]
        );

        $ultimo_registro = DB::table('dato_demograficos')
            ->select('dato_demograficos.id_demografico')
            ->orderBy('id_demografico', 'desc')
            ->first();
        return $ultimo_registro;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

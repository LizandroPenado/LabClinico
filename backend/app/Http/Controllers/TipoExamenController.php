<?php

namespace App\Http\Controllers;

use App\Models\TipoExamen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoExamenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* $tipoExamen = TipoExamen::all();
        return $tipoExamen; */

        $tipoExamen = DB::table('tipo_examens')
            ->join('tipo_muestras', 'tipo_muestras.id_tipomuestra', '=', 'tipo_examens.tipomuestra_id')
            ->select('tipo_examens.id_tipoexamen', 'tipo_examens.nombre_tipo_exam', 'tipo_examens.descripcion_tipo_exam', 'tipo_examens.codigo_tipo_examen', 'tipo_muestras.id_tipomuestra', 'tipo_muestras.nombre_tipo_mues')
            ->get();

        return $tipoExamen;
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
            'nombre_tipo_exam' => 'required|max:25',
            'descripcion_tipo_exam' => 'required|max:250',
            'codigo_tipo_examen' => 'required|max:5',
            'id_tipomuestra' => 'required',
        ], [
            'nombre_tipo_exam.required' => 'El nopmbre es requerido.',
            'descripcion_tipo_exam.required' => 'La descripcion es requerido.',
            'codigo_tipo_examen.required' => 'El codigo es requerido.',
            'id_tipomuestra.required' => 'El tipo de muestra es requerido.',
        ]);

        DB::insert(
            'insert into tipo_examens (nombre_tipo_exam,descripcion_tipo_exam,codigo_tipo_examen, tipomuestra_id) values (?, ?, ?, ?)',
            [ $validatedData['nombre_tipo_exam'], $validatedData['descripcion_tipo_exam'], $validatedData['codigo_tipo_examen'], $validatedData['id_tipomuestra']]
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
            'nombre_tipo_exam' => 'required|max:25',
            'descripcion_tipo_exam' => 'required|max:250',
            'codigo_tipo_examen' => 'required|max:5',
            'id_tipomuestra' => 'required',
        ], [
            'nombre_tipo_exam.required' => 'El nopmbre es requerido.',
            'descripcion_tipo_exam.required' => 'La descripcion es requerido.',
            'codigo_tipo_examen.required' => 'El codigo es requerido.',
            'id_tipomuestra.required' => 'El tipo de muestra es requerido.',
        ]);

        $act_examen = DB::table('tipo_examens')
              ->where('id_tipoexamen', $request->id_tipoexamen)
              ->update(['nombre_tipo_exam' => $validatedData['nombre_tipo_exam'], 'descripcion_tipo_exam' => $validatedData['descripcion_tipo_exam'], 'codigo_tipo_examen' => $validatedData['codigo_tipo_examen'], 'tipomuestra_id' => $validatedData['id_tipomuestra']]);
        return $act_examen;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipoExamen= new TipoExamen();
        $tipoExamen = DB::table('tipo_examens')->where('id_tipoexamen', $id)->delete();
        return $tipoExamen;
    }
}

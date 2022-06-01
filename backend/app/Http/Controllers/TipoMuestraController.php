<?php

namespace App\Http\Controllers;

use App\Models\TipoMuestra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoMuestraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoMuestra = TipoMuestra::all();
        return $tipoMuestra;
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
            'nombre_tipo_mues' => 'required|max:25',
            'descripcion_tipo_mues' => 'required|max:250',
            'codigo_tipo_muestra' => 'required|max:5',
        ], [
            'nombre_tipo_mues.required' => 'El nopmbre es requerido.',
            'descripcion_tipo_mues.required' => 'La descripcion es requerido.',
            'codigo_tipo_muestra.required' => 'El codigo es requerido.',
        ]);

        DB::insert(
            'insert into tipo_muestras (nombre_tipo_mues,descripcion_tipo_mues,codigo_tipo_muestra) values (?, ?, ?)',
            [ $validatedData['nombre_tipo_mues'], $validatedData['descripcion_tipo_mues'], $validatedData['codigo_tipo_muestra']]
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
            'nombre_tipo_mues' => 'required|max:25',
            'descripcion_tipo_mues' => 'required|max:250',
            'codigo_tipo_muestra' => 'required|max:5',
        ], [
            'nombre_tipo_mues.required' => 'El titulo es requerido.',
            'descripcion_tipo_mues.required' => 'La url es requerido.',
            'codigo_tipo_muestra.required' => 'El rol es requerido.',
        ]);

        $act_muestra = DB::table('tipo_muestras')
              ->where('id_tipomuestra', $request->id_tipomuestra)
              ->update(['nombre_tipo_mues' => $validatedData['nombre_tipo_mues'], 'descripcion_tipo_mues' => $validatedData['descripcion_tipo_mues'], 'codigo_tipo_muestra' => $validatedData['codigo_tipo_muestra']]);
        return $act_muestra;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipoMuestra = new TipoMuestra();
        $tipoMuestra = DB::table('tipo_muestras')->where('id_tipomuestra', $id)->delete();
        return $tipoMuestra;
    }
}

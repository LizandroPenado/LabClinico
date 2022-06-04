<?php

namespace App\Http\Controllers;

use App\Models\Privilegios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PrivilegiosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $privilegios = DB::table('privilegios')
            ->join('rols', 'rols.id_rol', '=', 'privilegios.rol_id')
            ->select('privilegios.id_privilegio', 'privilegios.nombre', 'privilegios.descripcion', 'rols.id_rol', 'rols.nombre_rol')
            ->get();

        return $privilegios;
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
            'nombre' => 'required|max:25',
            'descripcion' => 'required|max:30',
            'rol_id' => 'required',
        ], [
            'nombre.required' => 'El nombre es requerido.',
            'rol_id.required' => 'El rol es requerido.',
        ]);

        DB::insert(
            'insert into privilegios (nombre, descripcion, rol_id) values (?, ?, ?)',
            [$validatedData['nombre'], $validatedData['descripcion'], $validatedData['rol_id']]
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
            'nombre' => 'required|max:25',
            'descripcion' => 'required|max:30',
            'rol_id' => 'required',
        ], [
            'nombre.required' => 'El nombre es requerido.',
            'rol_id.required' => 'El rol es requerido.',
        ]);

        $act_privilegio = DB::table('privilegios')
              ->where('id_privilegio', $request->id_privilegio)
              ->update(['nombre' => $validatedData['nombre'], 'descripcion' => $validatedData['descripcion'], 'rol_id' => $validatedData['rol_id']]);
        return $act_privilegio;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $privilegios = new Privilegios();
        $privilegios = DB::table('privilegios')->where('id_privilegio', $id)->delete();
        return $privilegios;
    }
}

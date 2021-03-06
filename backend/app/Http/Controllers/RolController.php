<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rol = Rol::all();
        return $rol;
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
            'nombre_rol' => 'required|max:25',
            'codigo_rol' => 'required|max:3',
        ], [
            'nombre_rol.required' => 'El nopmbre es requerido.',
            'codigo_rol.required' => 'El codigo es requerido.',
        ]);

        DB::insert(
            'insert into rols (codigo_rol, nombre_rol) values (?, ?)',
            [ $validatedData['codigo_rol'], $validatedData['nombre_rol']]
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
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_rol' => 'required|max:25',
            'codigo_rol' => 'required|max:3',
        ], [
            'nombre_rol.required' => 'El nopmbre es requerido.',
            'codigo_rol.required' => 'El codigo es requerido.',
        ]);

        
        $act_rol = DB::table('rols')
              ->where('id_rol', $request->id_rol)
              ->update(['nombre_rol' => $validatedData['nombre_rol'], 'codigo_rol' => $validatedData['codigo_rol']]);
        return $act_rol;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $rol= new Rol();
        $rol = DB::table('rols')->where('id_rol', $id)->delete();
        return $rol;
    }
}

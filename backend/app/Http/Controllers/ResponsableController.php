<?php

namespace App\Http\Controllers;

use App\Models\Responsable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResponsableController extends Controller
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
        $responsable = new Responsable();
        $responsable->nombre_responsable = $request->get('nombre_res');
        $responsable->apellido_responsable = $request->get('apellido_res');
        $responsable->fecha_nacimiento_res = $request->get('fecha_nacimiento_res');
        $responsable->correo_responsable = $request->get('correo_res');
        $responsable->identificacion_res = $request->get('identificacion_res');
        $responsable->tipo_identificacion_res = $request->get('tipo_identificacion_res');
        $responsable->telefono_res = $request->get('telefono_res');
        $responsable->save();

        $ultimo_registro = DB::table('responsables')
            ->select('responsables.id_responsable', 'responsables.nombre_responsable')
            ->where('responsables.identificacion_res', '=',$request->get('identificacion_res'))
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

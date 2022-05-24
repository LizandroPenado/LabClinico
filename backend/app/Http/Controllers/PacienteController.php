<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PacienteController extends Controller
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
        /* $request->validate([
            'tipo' => 'required|max:50',
            'establecimiento_id' => 'required',
        ]); */

        $fecha = date($request->get('anio') . "/". $request->get('mes') . "/" . $request->get('dia'));

        $paciente = new Paciente();
        $paciente->nombre_paciente = $request->get('nombre');
        $paciente->apellido_paciente = $request->get('apellido');
        $paciente->fecha_nacimiento_pac = $fecha;
        $paciente->direccion_paciente = $request->get('direccion');
        $paciente->correo_paciente = $request->get('correo');
        $paciente->identificacion_pac = $request->get('identificacion');
        $paciente->tipo_identificacion_pac = $request->get('tipo_identificacion');
        $paciente->nacionalidad_pac = $request->get('nacionalidad');
        $paciente->municipio_id = $request->get('municipio');
        $paciente->responsable_id = $request->get('id');
        $paciente->demografico_id = $request->get('id_demografico');

        DB::insert(
            'insert into pacientes (nombre_paciente,apellido_paciente,fecha_nacimiento_pac,direccion_paciente,correo_paciente,identificacion_pac,tipo_identificacion_pac,nacionalidad_pac,responsable_id,municipio_id,demografico_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $paciente->nombre_paciente, $paciente->apellido_paciente, $paciente->fecha_nacimiento_pac, $paciente->direccion_paciente, $paciente->correo_paciente,
                $paciente->identificacion_pac, $paciente->tipo_identificacion_pac, $paciente->nacionalidad_pac, $paciente->responsable_id, $paciente->municipio_id,
                $paciente->demografico_id
            ]
        );

        $ultimo_registro = DB::table('pacientes')
            ->select('pacientes.id_paciente', 'pacientes.nombre_paciente')
            ->where('pacientes.identificacion_pac', '=', $request->get('identificacion'))
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

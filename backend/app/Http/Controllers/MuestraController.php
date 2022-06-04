<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MuestraController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('id');
        $id_clinica = 0;

        $empleado = DB::table('empleados')->get();

        foreach ($empleado as $emp) {
            if ($emp->usuario_id == $user) {
                $id_clinica = $emp->clinica_id;
            }
        }

        $orden = DB::table('orden_examenes')
            ->join('muestra', 'muestra.ordenexamen_id', '=', 'orden_examenes.id_ordenexamen')
            ->join('tipo_examens', 'tipo_examens.id_tipoexamen', '=', 'orden_examenes.tipoexamen_id')
            ->join('tipo_muestras', 'tipo_muestras.id_tipomuestra', '=', 'tipo_examens.tipomuestra_id')
            ->join('expedientes', 'expedientes.id_expediente', '=', 'orden_examenes.expediente_id')
            ->join('pacientes', 'pacientes.id_paciente', '=', 'expedientes.paciente_id')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'expedientes.clinica_id')
            ->select('orden_examenes.id_ordenexamen', 'orden_examenes.fecha_orden', 'orden_examenes.hora_orden', 'orden_examenes.tipoexamen_id', 'tipo_examens.nombre_tipo_exam', 'pacientes.identificacion_pac', 'pacientes.nombre_paciente', 'expedientes.id_expediente', 'muestra.tipo_muestra', 'muestra.codigo_muestra')
            ->where('clinicas.id_clinica', '=', $id_clinica)
            ->get();

        return $orden;
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
            'codigo_muestra' => 'required',
            'identificacion_paciente' => 'required',
            'id_ordenexamen' => 'required',
            'codigo_tipo_muestra' => 'required',
        ], [
            'codigo_muestra.required' => 'El codigo es requerido.',
            'identificacion_paciente.required' => 'La identificacion es requerido.',
            'id_ordenexamen.required' => 'La orden examen es requerido.',
            'codigo_tipo_muestra.required' => 'El tipo muestra es requerido.',
        ]);

        DB::insert(
            'insert into muestra (codigo_muestra, identificacion_paciente, tipo_muestra,ordenexamen_id) values (?, ?, ?, ?)',
            [
                $validatedData['codigo_muestra'], $validatedData['identificacion_paciente'], $validatedData['codigo_tipo_muestra'], $validatedData['id_ordenexamen']
            ]
        );
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
     * @param  int  $id_expediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_expediente)
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
    }
}

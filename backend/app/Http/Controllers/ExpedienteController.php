<?php

namespace App\Http\Controllers;

use App\Models\Expediente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpedienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $user = $request->get('id');
        $id_clinica = 0;

        $empleado = DB::table('empleados')->get();

        foreach($empleado as $emp){
            if($emp->usuario_id == $user){
                $id_clinica = $emp->clinica_id;
            }
            
        }         

        $expediente = DB::table('expedientes')
            ->join('pacientes', 'pacientes.id_paciente', '=', 'expedientes.paciente_id')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'expedientes.clinica_id')
            ->select('expedientes.id_expediente', 'pacientes.nombre_paciente', 'pacientes.apellido_paciente', 'clinicas.id_clinica', 'clinicas.nombre_clinica', 'expedientes.fecha_creacion_exp')
            ->where('clinicas.id_clinica', '=', $id_clinica)            
            ->get();

        return $expediente;

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
        $year = date("y-m-d");

        $validatedData = $request->validate([
            'fecha_creacion' => 'required',
            'id_clinica' => 'required',
            'id_paciente' => 'required',
        ], [
            'fecha_creacion.required' => 'La fecha es requerida.',
            'id_clinica.required' => 'La clinica es requerido.',
            'id_paciente.required' => 'El paciente es requerido.',
        ]);

        DB::insert(
            'insert into expedientes (fecha_creacion_exp, clinica_id, paciente_id) values (?, ?, ?)',
            [ $year, $validatedData['id_clinica'], $validatedData['id_paciente']]
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
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $expediente = new Expediente();
        $expediente = DB::table('expedientes')->where('id_expediente', $id)->delete();
        return $expediente;
    }

    public function filtroClinica(Request $request)
    {
        $user = $request->get('id');
        $filtrado = DB::table('expedientes')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'expedientes.clinica_id')
            ->select('clinicas.id_clinica', 'clinicas.nombre_clinica')
            ->where('expedientes.clinica_id', '=', $user)
            ->get();
        return $filtrado;
    } 

}

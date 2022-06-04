<?php

namespace App\Http\Controllers;
use App\Models\OrdenExamenes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdenExamenesController extends Controller
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

        $orden = DB::table('orden_examenes')
            ->join('tipo_examens', 'tipo_examens.id_tipoexamen', '=', 'orden_examenes.tipoexamen_id')
            ->join('expedientes', 'expedientes.id_expediente', '=', 'orden_examenes.expediente_id')
            ->join('pacientes', 'pacientes.id_paciente', '=', 'expedientes.paciente_id')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'expedientes.clinica_id')
            ->select('orden_examenes.id_ordenexamen','orden_examenes.fecha_orden', 'orden_examenes.hora_orden', 'orden_examenes.tipoexamen_id', 'tipo_examens.nombre_tipo_exam', 'pacientes.identificacion_pac', 'pacientes.nombre_paciente')
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
            'anio' => 'required',
            'mes' => 'required',
            'dia' => 'required',
            'hora_orden' => 'required',
            'expediente_id' => 'required',
            'id_tipoexamen' => 'required',
        ], [
            'expediente_id.required' => 'el expediente es requerido.',
            'id_tipoexamen.required' => 'El tipo examen es requerido.',
        ]);

        $fecha = date($request->get('anio') . "/". $request->get('mes') . "/" . $request->get('dia'));

        DB::insert(
            'insert into orden_examenes (fecha_orden, hora_orden, tipoexamen_id,expediente_id) values (?, ?, ?, ?)',
            [
                $fecha, $validatedData['hora_orden'], $validatedData['id_tipoexamen'], $validatedData['expediente_id']
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

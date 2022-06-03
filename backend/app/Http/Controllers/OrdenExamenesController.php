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
    public function index()
    {
        $orden = DB::table('orden_examenes')
            ->join('tipo_examens', 'tipo_examens.id_tipoexamen', '=', 'orden_examenes.tipoexamen_id')
            ->select('orden_examenes.id_ordenexamen','orden_examenes.fecha_orden', 'orden_examenes.hora', 'orden_examenes.tipoexamen_id')
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
        $fecha = date($request->get('anio') . "/". $request->get('mes') . "/" . $request->get('dia'));
        
        $orden->fecha_orden = $fecha;
        $orden->hora = $request->get('hora');
        $orden->expediente_id = $request->get('id_expediente');
        $orden->tipoexamen_id = $request->get('id_tipoexamen');

        DB::insert(
            'insert into orden_examenes (fecha_orden, hora, tipoexamen_id) values (?, ?, ?)',
            [
                $orden->fecha_orden, $orden->hora, $orden->tipoexamen_id
            ]
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

<?php

namespace App\Http\Controllers;

use App\Models\RefQuimica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefQuimicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->get('id');
        //$id_clinica = 0;

        $ref_quimica = DB::table('ref_quimica')
            ->select('ref_quimica.id_refquimica', 'ref_quimica.glucosa_min', 
                     'ref_quimica.glucosa_max', 'ref_quimica.colesterol_normal', 
                     'ref_quimica.trigliceridos_min', 'ref_quimica.trigliceridos_max', 
                     'ref_quimica.acido_id'
                     )
            ->get();

        return $ref_quimica;    
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
        //
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
            'glucosa_min' => 'required','glucosa_max' => 'required',
            'colesterol_normal' => 'required', 'trigliceridos_min' => 'required',
            'trigliceridos_max' => 'required'//, 'acido_id' => 'required'
        ], 
        [
            'glucosa_min.required' => 'La glucosa Minima es requerido.', 'glucosa_max.required' => 'La glucosa Maximo es requerido.',
            'colesterol_normal.required' => 'El colesterol normal es requerido.','trigliceridos_min.required' => 'Los trigliceridos minimos requerido.',
            'trigliceridos_max.required' => 'Los trigliceridos maximos son requeridos.'//, 'acido_id.required' => 'El  es requerido.'
        ]);

        $act_ref = DB::table('ref_quimica')
            ->where('id_refquimica', $request->id_refquimica)
            ->update(['glucosa_min' => $validatedData['glucosa_min'], 'glucosa_max' => $validatedData['glucosa_max'],
                      'colesterol_normal' => $validatedData['colesterol_normal'], 'trigliceridos_min' => $validatedData['trigliceridos_min'],
                      'trigliceridos_max' => $validatedData['trigliceridos_max']//, 'acido_id' => $validatedData['acido_id']
                     ]
                    );
            return $act_ref;       
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

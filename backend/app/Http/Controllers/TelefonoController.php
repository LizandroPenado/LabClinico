<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TelefonoController extends Controller
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
        $validatedData = $request->validate([
            'telefono1' => 'required|max:9|min:8',
            'telefono2' => 'max:9|min:8',
            'telefono3' => 'max:9|min:8',
            'paciente_id' => 'required',
        ], [
            'telefono1.required' => 'El telefono es requerido.',
            'paciente_id.required' => 'El paciente es requerido.',
        ]);

        DB::insert(
            'insert into telefonos (numero, paciente_id) values (?, ?)',
            [$validatedData['telefono1'], $validatedData['paciente_id']]
        );
        if (strlen($validatedData['telefono2']) == 8) {
            DB::insert(
                'insert into telefonos (numero, paciente_id) values (?, ?)',
                [$validatedData['telefono2'], $validatedData['paciente_id']]
            );
        }
        if (strlen($validatedData['telefono3']) == 8) {
            DB::insert(
                'insert into telefonos (numero, paciente_id) values (?, ?)',
                [$validatedData['telefono3'], $validatedData['paciente_id']]
            );
        }
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

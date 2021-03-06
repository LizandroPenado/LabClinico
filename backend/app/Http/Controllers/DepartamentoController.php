<?php

namespace App\Http\Controllers;
use App\Models\Departamento;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departamentos = Departamento::all();
        return $departamentos;
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
        /* $departamento = new Departamento();
        $departamento->nombre_dep = $request->get('nombre_dep');
        $departamento->codigo_dep = $request->get('codigo_dep');
        $departamento->save(); */

        DB::insert(
            'insert into departamentos (nombre_dep,codigo_dep) values (?, ?)',
            [ $request->get('nombre_dep'), $request->get('codigo_dep')]
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
        $departamento = Departamento::findOrFail($request->id);
        $departamento->nombre_dep = $request->get('nombre_dep');
        $departamento->codigo_dep = $request->get('codigo_dep');
        $departamento->save();
        return $departamento;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $departamento = Departamento::destroy($request->id);
        return $departamento;
    }
}

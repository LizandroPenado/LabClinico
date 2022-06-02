<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empleado = DB::table('empleados')
            ->join('municipios', 'municipios.id_municipio', '=', 'empleados.municipio_id')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'empleados.clinica_id')
            ->join('users', 'users.id', '=', 'empleados.usuario_id')
            ->select('empleados.id_empleado', 'empleados.nombre_empleado', 'empleados.apellido_empleado', 'empleados.profesion', 'empleados.correo_empleado', 'clinicas.id_clinica', 'clinicas.nombre_clinica', 'users.id', 'users.name')
            ->get();

        return $empleado;
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
            'nombre_empleado' => 'required|max:25',
            'apellido_empleado' => 'required|max:25',
            'profesion' => 'required|max:30',
            'correo_empleado' => 'required|max:50',
            'telefono_empleado' => 'required|max:9',
            'sexo_empleado' => 'required|max:10',
            'direccion_empleado' => 'required|max:100',
            'codigo_empleado' => 'required|max:15',
            'id_clinica' => 'required',
            'id_usuario' => 'required',
            'id_municipio' => 'required',
        ], [
            'nombre_empleado.required' => 'El nombre es requerido.',
            'apellido_empleado.required' => 'El apellido es requerido.',
            'profesion.required' => 'La profesion es requerido.',
            'correo_empleado.required' => 'El correo es requerido.',
            'telefono_empleado.required' => 'El telefono es requerido.',
            'sexo_empleado.required' => 'El sexo es requerido.',
            'direccion_empleado.required' => 'La direccion es requerido.',
            'codigo_empleado.required' => 'El codigo es requerido.',
            'id_clinica.required' => 'La clinica es requerido.',
            'id_usuario.required' => 'El usuario es requerido.',
            'id_municipio.required' => 'El municipio es requerido.',
        ]);

        DB::insert(
            'insert into empleados (nombre_empleado,apellido_empleado,profesion, correo_empleado, telefono_empleado, sexo_empleado, direccion_empleado, codigo_empleado, clinica_id, usuario_id, municipio_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [$validatedData['nombre_empleado'], $validatedData['apellido_empleado'], $validatedData['profesion'], $validatedData['correo_empleado'],
            $validatedData['telefono_empleado'], $validatedData['sexo_empleado'], $validatedData['direccion_empleado'], $validatedData['codigo_empleado'],
            $validatedData['id_clinica'], $validatedData['id_usuario'], $validatedData['id_municipio']]
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
        $empleado = new Empleado();
        $empleado = DB::table('empleados')->where('id_empleado', $id)->delete();
        return $empleado;
    }

    public function filtroClinica(Request $request)
    {
        $user = $request->get('id');
        $filtrado = DB::table('empleados')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'empleados.clinica_id')
            ->select('clinicas.id_clinica', 'clinicas.nombre_clinica')
            ->where('empleados.usuario_id', '=', $user)
            ->get();
        return $filtrado;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* $user = User::with('rol')->get();
        return $user; */
        $user = DB::table('users')
            ->join('rols', 'rols.id_rol', '=', 'users.rol_id')
            ->select('users.id', 'users.name', 'users.email', 'users.name', 'users.estado', 'rols.id_rol', 'rols.nombre_rol')
            ->get();

        return $user;
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
        $user = new User();
        $user = DB::table('users')->where('id', $request->get('id'))->first();
        $user->rol_id = $request->get('rol_id');
        $user->estado = $request->get('estado');

        $act_user = DB::table('users')
            ->where('id', $request->id)
            ->update(['rol_id' => $user->rol_id, 'estado' => $user->estado]);
        return $act_user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::destroy($request->id);
        return $user;
    }

    function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:30|min:4',
            'password' => 'required|max:30|min:8',
            'email' => 'required|max:50|email|unique:users',
            'estado' => 'required',
            'rol_id' => 'required',
        ], [
            'name.required' => 'El nombre es requerido.',
            'password.required' => 'La contraseña es requerido.',
            'email.required' => 'El correo es requerido.',
            'rol_id.required' => 'El rol es requerido.',
            'email.email' => 'Tiene que ser un correo electronico.'
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);
        DB::table('users')->insert([
            'name' =>   $validatedData['name'],
            'email' =>  $validatedData['email'],
            'password' => $validatedData['password'],
            'estado' => $validatedData['estado'],
            'rol_id' => $validatedData['rol_id']
        ]);
    }
    function login(Request $req)
    {
        $email =  $req->input('email');
        $password = $req->input('password');

        $user = DB::table('users')->where('email', $email)->first();
        if (!Hash::check($password, $user->password)) {
            echo "Not Matched";
        } else {
            //$user = DB::table('users')->where('email',$email)->first();
            echo $user->email;
        }
    }

    function estado(Request $request)
    {
        $user = DB::table('users')
            ->where('users.name', $request->name)
            ->first();

        return $user->estado;
    }

    public function bloquear(Request $request)
    {
        /* $bloc_user = DB::table('users')
              ->where('email', $request->get('email'))
              ->update(['estado' => 'Bloqueado']);
        return $bloc_user; */

        $bloc_user = DB::table('users')
            ->where('users.name', $request->name)
            ->update(['estado' => 'Bloqueado']);
        return $bloc_user;
    }

    public function userClinica(Request $request){
        $user = $request->get('id');
        $id_clinica = 0;

        $empleado = DB::table('empleados')->get();

        foreach ($empleado as $emp) {
            if ($emp->usuario_id == $user) {
                $id_clinica = $emp->clinica_id;
            }
        }

        $user = DB::table('empleados')
            ->join('users', 'users.id', '=', 'empleados.usuario_id')
            ->join('clinicas', 'clinicas.id_clinica', '=', 'empleados.clinica_id')
            ->join('rols', 'rols.id_rol', '=', 'users.rol_id')
            ->select('users.id', 'users.name', 'users.email', 'users.name', 'users.estado', 'rols.id_rol', 'rols.nombre_rol', 'clinicas.nombre_clinica')
            ->where('clinicas.id_clinica', '=', $id_clinica) 
            ->get();

        return $user;
    }
}

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
        /*$user = new User();
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = $request->get('password');
        $user->estado = $request->get('estado');
        $user->rol_id = $request->get('rol_id');
        $user->save();*/

        $nombre = $request->get('name');
        $email = $request->get('email');
        $password = $request->get('password');
        $estado = $request->get('estado');
        $rol = $request->get('rol_id');

        DB::insert(
            'insert into users (name,email,password,estado,rol_id) values (?, ?, ?, ?, ?)',
            [$nombre, $email, $password, $estado, $rol]
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
        $rol = (int) $request->get('rol_id');
        $user = User::find($request->id);
        $user->rol_id = $rol;
        $user->estado = $request->get('estado');
        $user->save();
        return $user;
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
        $name = $request->get('name');
        $email = $request->get('email');
        $estado = $request->get('estado');
        $rol = $request->get('rol_id');
        $password = Hash::make($request->get('password'));
        DB::table('users')->insert([
            'name' =>   $name,
            'email' =>  $email ,
            'password'=> $password,
            'estado'=> $estado,
            'rol_id' => $rol
          ]);
    }
    function login(Request $req)
    {
        $email =  $req->input('email');
        $password = $req->input('password');
 
        $user = DB::table('users')->where('email',$email)->first();
        if(!Hash::check($password, $user->password))
        {
            echo "Not Matched";
        }
        else
        {
            //$user = DB::table('users')->where('email',$email)->first();
           echo $user->email;
        }
    }
}

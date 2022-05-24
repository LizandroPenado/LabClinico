<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menu = Menu::all();
        return $menu;
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
            'titulo' => 'required|max:20',
            'url' => 'required|max:15',
            'rol_id' => 'required',
        ], [
            'titulo.required' => 'El titulo es requerido.',
            'url.required' => 'La url es requerido.',
            'rol_id.required' => 'El rol es requerido.',
        ]);

        DB::insert(
            'insert into menus (titulo,url,rol_id) values (?, ?, ?)',
            [ $validatedData['titulo'], $validatedData['url'], $validatedData['rol_id']]
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
        $validatedData = $request->validate([
            'titulo' => 'required|max:20',
            'url' => 'required|max:15',
            'rol_id' => 'required',
        ], [
            'titulo.required' => 'El titulo es requerido.',
            'url.required' => 'La url es requerido.',
            'rol_id.required' => 'El rol es requerido.',
        ]);
        
        $act_menu = DB::table('menus')
              ->where('id_menu', $request->id_menu)
              ->update(['titulo' => $validatedData['titulo'], 'url' => $validatedData['url'], 'rol_id' => $validatedData['rol_id']]);
        return $act_menu;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $menu = new Menu();
        $menu = DB::table('menus')->where('id_menu', $id)->delete();
        return $menu;
    }

    public function menuRol()
    {
        $menu = DB::table('menus')
            ->join('rols', 'rols.id_rol', '=', 'menus.rol_id')
            ->select('menus.id_menu', 'menus.titulo', 'menus.url', 'rols.id_rol', 'rols.nombre_rol')
            ->get();

        return $menu;
    }
}

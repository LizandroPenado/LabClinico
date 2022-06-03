<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DatoDemograficoController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ResponsableController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TelefonoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PrivilegiosController;
use App\Http\Controllers\TipoExamenController;
use App\Http\Controllers\TipoMuestraController;
use App\Http\Controllers\OrdenExamenesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::get('user/estado', [UserController::class, 'estado']);

Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('departamento', [DepartamentoController::class, 'index']);
    Route::post('departamento', [DepartamentoController::class, 'store']);
    
    Route::get('municipio', [MunicipioController::class, 'index']);
    Route::get('municipio/departamentos', [MunicipioController::class, 'filtroDepartamento']);

    Route::get('responsable', [ResponsableController::class, 'index']);
    Route::post('responsable', [ResponsableController::class, 'store']);

    Route::get('paciente', [PacienteController::class, 'index']);
    Route::post('paciente', [PacienteController::class, 'store']);

    Route::get('user', [UserController::class, 'index']);
    Route::get('user/rol', [UserController::class, 'userRol']);
    Route::post('user/register', [UserController::class, 'register']);
    Route::put('user/bloquear', [UserController::class, 'bloquear']);
    Route::post('user', [UserController::class, 'store']);
    Route::put('user/{id}', [UserController::class, 'update']);
    Route::delete('user/{id}', [UserController::class, 'destroy']);

    Route::get('rol', [RolController::class, 'index']);
    Route::post('rol', [RolController::class, 'store']);
    Route::put('rol/{id}', [RolController::class, 'update']);
    Route::delete('rol/{id}', [RolController::class, 'destroy']);

    Route::post('demografico', [DatoDemograficoController::class, 'store']);

    Route::get('menu', [MenuController::class, 'index']);
    Route::post('menu', [MenuController::class, 'store']);
    Route::put('menu/{id}', [MenuController::class, 'update']);
    Route::delete('menu/{id}', [MenuController::class, 'destroy']);
    Route::get('menu/rol', [MenuController::class, 'menuRol']);

    Route::get('telefono', [TelefonoController::class, 'index']);
    Route::post('telefono', [TelefonoController::class, 'store']);

    Route::get('privilegios', [PrivilegiosController::class, 'index']); 
    Route::post('privilegios', [PrivilegiosController::class, 'store']);
    Route::put('privilegios/{id}', [PrivilegiosController::class, 'update']);
    Route::delete('privilegios/{id}', [PrivilegiosController::class, 'destroy']);

    Route::get('tipomuestra', [TipoMuestraController::class, 'index']);
    Route::post('tipomuestra', [TipoMuestraController::class, 'store']);
    Route::put('tipomuestra/{id}', [TipoMuestraController::class, 'update']);
    Route::delete('tipomuestra/{id}', [TipoMuestraController::class, 'destroy']);

    Route::get('tipoexamen', [TipoExamenController::class, 'index']);
    Route::post('tipoexamen', [TipoExamenController::class, 'store']);
    Route::put('tipoexamen/{id}', [TipoExamenController::class, 'update']);
    Route::delete('tipoexamen/{id}', [TipoExamenController::class, 'destroy']);

    Route::get('orden', [OrdenExamenesController::class, 'index']);
    Route::post('orden', [OrdenExamenesController::class, 'store']);
});

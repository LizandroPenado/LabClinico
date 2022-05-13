<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ResponsableController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\UserController;
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
/* Route::post('/login', 'App\Http\Controllers\AuthController@login'); */
Route::post('register', [AuthController::class,'register']);
/* Route::post('/register', 'App\Http\Controllers\AuthController@register'); */

Route::group(['middleware'=>'api'], function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::get('departamento', [DepartamentoController::class, 'index'] /* 'App\Http\Controllers\DepartamentoController@index' */); 
Route::post('departamento', [DepartamentoController::class, 'store'] /* 'App\Http\Controllers\DepartamentoController@store' */); 

Route::get('municipio', [MunicipioController::class, 'index']); 
Route::get('municipio/departamentos', [MunicipioController::class, 'filtroDepartamento']);

Route::get('responsable', [ResponsableController::class, 'index']); 
Route::post('responsable', [ResponsableController::class, 'store']);

Route::get('paciente', [PacienteController::class, 'index']); 
Route::post('paciente', [PacienteController::class, 'store']);

Route::get('user', [UserController::class, 'index']); 
Route::post('user', [UserController::class, 'store']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::delete('user/{id}', [UserController::class, 'destroy']);

Route::get('rol', [RolController::class, 'index']); 
Route::post('rol', [RolController::class, 'store']);
Route::put('rol/{id}', [RolController::class, 'update']);
Route::delete('rol/{id}', [RolController::class, 'destroy']);
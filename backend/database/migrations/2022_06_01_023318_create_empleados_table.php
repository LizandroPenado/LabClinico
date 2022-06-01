<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('id_empleado');
            $table->string('nombre_empleado', 25);
            $table->string('apellido_empleado', 25);
            $table->string('profesion', 30);
            $table->string('numero_junta', 10)->nullable();
            $table->string('correo_empleado', 50)->unique();
            $table->string('telefono_empleado', 9);
            $table->string('sexo_empleado', 10);
            $table->string('codigo_empleado', 15);
            $table->string('direccion_empleado', 100);
            $table->unsignedBigInteger('clinica_id');
            $table->foreign('clinica_id')->references('id_clinica')->on('clinicas')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('municipio_id');
            $table->foreign('municipio_id')->references('id_municipio')->on('municipios')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
};

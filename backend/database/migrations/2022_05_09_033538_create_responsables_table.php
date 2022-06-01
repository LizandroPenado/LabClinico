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
        Schema::create('responsables', function (Blueprint $table) {
            $table->id('id_responsable');
            $table->string('nombre_responsable', 25);
            $table->string('apellido_responsable', 25);
            $table->string('correo_responsable', 50)->unique()->nullable();
            $table->string('identificacion_res', 20)->unique();
            $table->string('tipo_identificacion_res', 9);
            $table->date('fecha_nacimiento_res');
            $table->string('telefono_res', 9);
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
        Schema::dropIfExists('responsables');
    }
};

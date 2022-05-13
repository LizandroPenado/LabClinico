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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id('id_paciente');
            $table->string('nombre_paciente', 25);
            $table->string('apellido_paciente', 25);
            $table->date('fecha_nacimiento_pac');
            $table->string('sexo_paciente', 10);
            $table->string('direccion_paciente', 100);
            $table->string('correo_paciente', 50)->unique();
            $table->string('estado_civil', 15);
            $table->string('identificacion_pac', 20)->unique();
            $table->string('tipo_identificacion_pac', 9);
            $table->string('nacionalidad_pac', 15);
            $table->unsignedBigInteger('responsable_id');
            $table->foreign('responsable_id')->references('id_responsable')->on('responsables')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('municipio_id');
            $table->foreign('municipio_id')->references('id_municipio')->on('municipios')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('pacientes');
    }
};

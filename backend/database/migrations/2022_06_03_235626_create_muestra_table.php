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
        Schema::create('muestra', function (Blueprint $table) {
            $table->id('id_muestra');
            $table->string('codigo_muestra', 5);
            $table->string('identificacion_paciente', 20);
            $table->string('tipo_muestra', 5);
            $table->unsignedBigInteger('ordenexamen_id');
            $table->foreign('ordenexamen_id')->references('id_ordenexamen')->on('orden_examenes')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('muestra');
    }
};

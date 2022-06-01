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
        Schema::create('tipo_muestras', function (Blueprint $table) {
            $table->id('id_tipomuestra');
            $table->string('nombre_tipo_mues', 25);
            $table->string('descripcion_tipo_mues', 250);
            $table->string('codigo_tipo_muestra', 5);
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
        Schema::dropIfExists('tipo_muestras');
    }
};

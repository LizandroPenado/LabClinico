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
        Schema::create('orden_examenes', function (Blueprint $table) {
            $table->id('id_ordenexamen');
            $table->date('fecha_orden');
            $table->string('hora_orden', 30);
            $table->unsignedBigInteger('tipoexamen_id');
            $table->foreign('tipoexamen_id')->references('id_tipoexamen')->on('tipo_examens')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('expediente_id');
            $table->foreign('expediente_id')->references('id_expediente')->on('expedientes')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('orden_examenes');
    }
};

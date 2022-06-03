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
        Schema::create('tipo_examens', function (Blueprint $table) {
            $table->id('id_tipoexamen');
            $table->string('nombre_tipo_exam', 40);
            $table->string('descripcion_tipo_exam', 250);
            $table->string('codigo_tipo_examen', 5);
            $table->unsignedBigInteger('tipomuestra_id');
            $table->foreign('tipomuestra_id')->references('id_tipomuestra')->on('tipo_muestras')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('tipo_examens');
    }
};

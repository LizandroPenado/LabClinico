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
        Schema::create('examenes', function (Blueprint $table) {
            $table->id('id_examen');
            $table->date('fecha_examen');
            $table->string('hora_examen', 30);
            $table->unsignedBigInteger('ordenexamen_id');
            $table->unsignedBigInteger('cropologia_id');
            $table->unsignedBigInteger('quimico_id');
            $table->unsignedBigInteger('urianalisis_id');
            $table->unsignedBigInteger('hematologia_id');
            $table->foreign('ordenexamen_id')->references('id_ordenexamen')->on('orden_examenes')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('cropologia_id')->references('id_cropologia')->on('cropologia')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('quimico_id')->references('id_quimico')->on('quimico')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('urianalisis_id')->references('id_urianalisis')->on('uri_analisis')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('hematologia_id')->references('id_hematologia')->on('hematologia')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('examenes');
    }
};

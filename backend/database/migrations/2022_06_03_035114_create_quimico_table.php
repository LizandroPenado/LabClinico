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
        Schema::create('quimico', function (Blueprint $table) {
            $table->id('id_quimico');
            $table->string('sustancias_uri', 30);
            $table->integer('densidad_uri');
            $table->integer('ph_uri');
            $table->unsignedBigInteger('urianalisis_id');
            $table->foreign('urianalisis_id')->references('id_urianalisis')->on('uri_analisis')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('quimico');
    }
};

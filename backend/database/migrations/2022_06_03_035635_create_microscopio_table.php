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
        Schema::create('microscopio', function (Blueprint $table) {
            $table->id('id_microscopio');
            $table->string('celulas_escamosas', 15);
            $table->string('celulas_redondas', 15);
            $table->string('tipo_cilindro', 25);
            $table->integer('cilindro');
            $table->string('tipo_cristales', 25);
            $table->string('cristales', 15);
            $table->string('parasitos_uri', 15);
            $table->string('mucoides_uri', 15);
            $table->string('bacterias_uri', 15);
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
        Schema::dropIfExists('microscopio');
    }
};

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
        Schema::create('uri_analisis', function (Blueprint $table) {
            $table->id('id_urianalisis');
            $table->integer('leucocitos_uri');
            $table->string('nitritos', 10);
            $table->integer('proteina');
            $table->integer('glucosa_uri');
            $table->string('cuerpos_centonicos', 10);
            $table->integer('urobilogeno');
            $table->string('bilirrubina', 10);
            $table->integer('sangre_uri');
            $table->integer('globulos_rojos');
            $table->string('levadura_uri', 15);
            $table->unsignedBigInteger('refurianalisis_id');
            $table->foreign('refurianalisis_id')->references('id_refurianalisis')->on('ref_urianalisis')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('uri_analisis');
    }
};

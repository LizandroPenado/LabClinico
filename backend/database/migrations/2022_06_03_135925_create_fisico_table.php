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
        Schema::create('fisico', function (Blueprint $table) {
            $table->id('id_fisico');
            $table->string('color_uri', 15);
            $table->string('aspecto_uri', 15);
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
        Schema::dropIfExists('fisico');
    }
};
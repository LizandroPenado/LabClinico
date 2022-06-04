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
        Schema::create('rango_celula', function (Blueprint $table) {
            $table->id('id_rangocel');
            $table->integer('cel_hombre_max');
            $table->integer('cel_hombre_min');
            $table->integer('cel_nino_max');
            $table->integer('cel_nino_min');
            $table->integer('cel_bebe_max');
            $table->integer('cel_bebe_min');
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
        Schema::dropIfExists('rango_celula');
    }
};

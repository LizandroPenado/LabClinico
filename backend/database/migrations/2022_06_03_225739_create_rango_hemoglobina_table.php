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
        Schema::create('rango_hemoglobina', function (Blueprint $table) {
            $table->id('id_rangohem');
            $table->integer('hem_hombre_max');
            $table->integer('hem_hombre_min');
            $table->integer('hem_mujer_max');
            $table->integer('hem_mujer_min');
            $table->integer('hem_nino_max');
            $table->integer('hem_nino_min');
            $table->integer('hem_bebe_max');
            $table->integer('hem_bebe_min');
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
        Schema::dropIfExists('rango_hemoglobina');
    }
};

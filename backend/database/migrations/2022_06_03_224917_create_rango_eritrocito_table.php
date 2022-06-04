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
        Schema::create('rango_eritrocito', function (Blueprint $table) {
            $table->id('id_rangoeri');
            $table->integer('eri_hombre_max');
            $table->integer('eri_hombre_min');
            $table->integer('eri_mujer_max');
            $table->integer('eri_mujer_min');
            $table->integer('eri_nino_max');
            $table->integer('eri_nino_min');
            $table->integer('eri_bebe_max');
            $table->integer('eri_bebe_min');
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
        Schema::dropIfExists('rango_eritrocito');
    }
};

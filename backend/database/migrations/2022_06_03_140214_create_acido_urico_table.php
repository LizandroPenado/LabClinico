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
        Schema::create('acido_urico', function (Blueprint $table) {
            $table->id('id_acido');
            $table->integer('hombre_max');
            $table->integer('hombre_min');
            $table->integer('mujer_max');
            $table->integer('mujer_min');
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
        Schema::dropIfExists('acido_urico');
    }
};
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
        Schema::create('tipeo_sangre', function (Blueprint $table) {
            $table->id('id_tipeosangre');
            $table->string('grupo_a', 25);
            $table->string('grupo_b', 25);
            $table->string('grupo_o', 25);
            $table->string('grupo_ab', 25);
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
        Schema::dropIfExists('tipeo_sangre');
    }
};

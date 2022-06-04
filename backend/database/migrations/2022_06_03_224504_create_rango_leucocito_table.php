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
        Schema::create('rango_leucocito', function (Blueprint $table) {
            $table->id('id_rangoleu');
            $table->integer('leu_nino_max');
            $table->integer('leu_nino_min');
            $table->integer('leu_adulto_max');
            $table->integer('leu_adulto_min');
            $table->string('tipo_leucocito', 25);
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
        Schema::dropIfExists('rango_leucocito');
    }
};

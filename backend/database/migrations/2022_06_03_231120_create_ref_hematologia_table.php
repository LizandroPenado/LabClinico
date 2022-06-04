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
        Schema::create('ref_hematologia', function (Blueprint $table) {
            $table->id('id_refhematologia');
            $table->string('du_positivo', 30);
            $table->string('du_negativo', 30);
            $table->unsignedBigInteger('plaqueta_max');
            $table->unsignedBigInteger('plaqueta_min');
            $table->unsignedBigInteger('rangoleu_id');
            $table->unsignedBigInteger('rangoeri_id');
            $table->unsignedBigInteger('rangocel_id');
            $table->unsignedBigInteger('rangohem_id');
            $table->unsignedBigInteger('tipeosangre_id');
            $table->foreign('rangoleu_id')->references('id_rangoleu')->on('rango_leucocito')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('rangoeri_id')->references('id_rangoeri')->on('rango_eritrocito')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('rangocel_id')->references('id_rangocel')->on('rango_celula')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('rangohem_id')->references('id_rangohem')->on('rango_hemoglobina')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('tipeosangre_id')->references('id_tipeosangre')->on('tipeo_sangre')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('ref_hematologia');
    }
};

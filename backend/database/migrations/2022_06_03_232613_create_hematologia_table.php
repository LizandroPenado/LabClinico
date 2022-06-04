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
        Schema::create('hematologia', function (Blueprint $table) {
            $table->id('id_hematologia');
            $table->integer('neutrofilos_segmentados');
            $table->integer('linfocito');
            $table->integer('neutrofilos_banda');
            $table->integer('eosinofilos');
            $table->integer('basofilos');
            $table->integer('monocitos');
            $table->string('anisocitosis', 15);
            $table->string('poiquilocitosis', 15);
            $table->string('hipocromia', 15);
            $table->string('madurez_leucocito', 30);
            $table->string('variante_leucocito', 30);
            $table->string('alteraciom', 30);
            $table->integer('cantidad_plaqueta');
            $table->string('tamanio_plaqueta', 10);
            $table->integer('eritrocito');
            $table->integer('hemoglobina_hema');
            $table->unsignedBigInteger('plaquetas');
            $table->string('tipo_sangre', 10);
            $table->string('rh', 10);
            $table->unsignedBigInteger('refhematologia_id');
            $table->foreign('refhematologia_id')->references('id_refhematologia')->on('ref_hematologia')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('hematologia');
    }
};

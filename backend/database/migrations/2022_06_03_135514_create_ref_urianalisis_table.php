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
        Schema::create('ref_urianalisis', function (Blueprint $table) {
            $table->id('id_refurianalisis');
            $table->integer('ph_min');
            $table->integer('ph_max');
            $table->integer('densidad_min');
            $table->integer('densidad_max');
            $table->integer('leucocitos_normal');
            $table->string('nitrito_normal', 10);
            $table->integer('proteina_normal');
            $table->integer('glucosa_normal');
            $table->string('cuerpos_centonicos_normal', 10);
            $table->integer('urobilogeno_normal');
            $table->string('bilirrubina_normal', 10);
            $table->integer('sangre_normal');
            $table->string('celulas_escamosas_normal', 15);
            $table->string('celulas_redondas_normal', 15);
            $table->integer('cilindros_normal');
            $table->string('cristales_normal', 15);
            $table->string('parasitos_normal', 15);
            $table->string('mucoides_normal', 15);
            $table->string('bacterias_normal', 15);
            $table->integer('globulos_rojos_normal');
            $table->string('levadura_normal', 15);
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
        Schema::dropIfExists('ref_urianalisis');
    }
};
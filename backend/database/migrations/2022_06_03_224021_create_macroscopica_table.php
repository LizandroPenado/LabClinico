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
        Schema::create('macroscopica', function (Blueprint $table) {
            $table->id('id_macroscopica');
            $table->string('color_cropo', 15);
            $table->string('consistencia_cropo', 15);
            $table->string('mucus_cropo', 15);
            $table->string('sangre_cropo', 15);
            $table->string('restos_alimenticio', 15);
            $table->string('parasito_larvario', 15);
            $table->unsignedBigInteger('cropologia_id');
            $table->foreign('cropologia_id')->references('id_cropologia')->on('cropologia')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('macroscopica');
    }
};

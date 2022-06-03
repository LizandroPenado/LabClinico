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
        Schema::create('ref_quimica', function (Blueprint $table) {
            $table->id('id_refquimica');
            $table->integer('glucosa_min');
            $table->integer('glucosa_max');
            $table->integer('colesterol_normal');
            $table->integer('trigliceridos_min');
            $table->integer('trigliceridos_max');
            $table->unsignedBigInteger('acido_id');
            $table->foreign('acido_id')->references('id_acido')->on('acido_urico')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('ref_quimica');
    }
};
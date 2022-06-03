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
        Schema::create('quimica_clinica', function (Blueprint $table) {
            $table->id('id_quimica');
            $table->integer('glucosa_quimica');
            $table->integer('colesterol');
            $table->integer('trigliceridos');
            $table->integer('acido_urico');
            $table->unsignedBigInteger('refquimica_id');
            $table->foreign('refquimica_id')->references('id_refquimica')->on('ref_quimica')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('quimica_clinica');
    }
};
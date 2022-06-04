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
        Schema::create('microscopica', function (Blueprint $table) {
            $table->id('id_microscopica');
            $table->string('leucocitos_cropo', 15);
            $table->string('parasito_protozoarios', 15);
            $table->string('parasito_metazoarios', 15);
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
        Schema::dropIfExists('microscopica');
    }
};

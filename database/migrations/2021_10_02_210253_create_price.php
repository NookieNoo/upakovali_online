<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
//            $table->decimal('price');
            $table->unsignedInteger('parthner_id');
            $table->timestampTz('start');
            $table->timestampTz('end');
            $table->timestampsTz();
        });

        Schema::table('prices', function (Blueprint $table) {
            $table->foreign('parthner_id')->references('id')->on('parthners');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('prices', function (Blueprint $table) {
            $table->dropForeign(['parthner_id']);
        });
        Schema::dropIfExists('prices');
    }
}

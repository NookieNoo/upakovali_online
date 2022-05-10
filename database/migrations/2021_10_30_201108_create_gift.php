<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGift extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gifts', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('order_id');
            $table->unsignedInteger('service_id');
            $table->unsignedDecimal('weight');
            $table->unsignedInteger('length');
            $table->unsignedInteger('width');
            $table->unsignedInteger('height');
            $table->unsignedInteger('addressee_id');

            $table->timestampsTz();
        });

        Schema::table('gifts', function (Blueprint $table) {
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('addressee_id')->references('id')->on('addressees');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('gifts', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['service_id']);
            $table->dropForeign(['addressee_id']);
        });
        Schema::dropIfExists('gift');
    }
}

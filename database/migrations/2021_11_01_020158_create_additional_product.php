<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdditionalProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('additional_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedDecimal('price');
            $table->unsignedInteger('order_id');
            $table->timestamps();
        });

        Schema::table('additional_products', function (Blueprint $table) {
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('additional_products', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
        });
        Schema::dropIfExists('additional_products');
    }
}

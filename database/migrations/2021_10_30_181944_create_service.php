<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateService extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('price_id');
            $table->string('name');
            $table->unsignedInteger('product_id');
//            $table->unsignedDecimal('price');
            $table->timestamps();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->foreign('price_id')->references('id')->on('prices');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['price_id']);
            $table->dropForeign(['product_id']);
        });
        Schema::dropIfExists('service');
    }
}

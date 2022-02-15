<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDeliveryPoints extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delivery_points', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('pick_up_address_point_id')->references('id')->on('delivery_points');
            $table->foreign('delivery_address_point_id')->references('id')->on('delivery_points');
        });

        Schema::dropIfExists('user_delivery_points');
    }
}

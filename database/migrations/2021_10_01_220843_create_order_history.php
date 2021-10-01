<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('status_id');
            $table->timestamp('date');
            $table->timestamps();
        });

        Schema::table('order_history', function (Blueprint $table) {
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('status_id')->references('id')->on('order_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['status_id']);
        });
        Schema::dropIfExists('order_history');
    }
}

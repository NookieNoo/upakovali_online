<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('source_id');
            $table->unsignedInteger('parthner_id')->nullable();
            $table->string('external_number')->nullable();
            $table->unsignedInteger('client_id');
            $table->unsignedInteger('workshop_id');
            $table->unsignedInteger('addressee_id');
            $table->unsignedInteger('pick_up_point_id')->comment('Точка забора товара')->nullable();
            $table->string('pick_up_address')->comment('Точка забора товара')->nullable();
            $table->unsignedInteger('delivery_point_id')->nullable()->comment('Точка выдачи товара');
            $table->string('delivery_address')->nullable();
            $table->timestamp('receiving_date');
            $table->timestamp('issue_date');
            $table->text('comment')->nullable();
            $table->unsignedInteger('courier_receiver_id')->nullable()->comment('Курьер принимающий');
            $table->unsignedInteger('courier_issuer_id')->nullable()->comment('Курьер выдающий');
            $table->boolean('isPaid')->nullable();

            $table->unsignedInteger('master_id')->nullable();
            $table->unsignedInteger('receiver_id');

            $table->timestamps();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('source_id')->references('id')->on('sources');
            $table->foreign('parthner_id')->references('id')->on('parthners');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('workshop_id')->references('id')->on('workshops');
            $table->foreign('addressee_id')->references('id')->on('addressees');
            $table->foreign('pick_up_point_id')->references('id')->on('workshops');
            $table->foreign('delivery_point_id')->references('id')->on('workshops');
            $table->foreign('courier_receiver_id')->references('id')->on('users');
            $table->foreign('courier_issuer_id')->references('id')->on('users');
            $table->foreign('master_id')->references('id')->on('users');
            $table->foreign('receiver_id')->references('id')->on('clients');
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
            $table->dropForeign(['source_id']);
            $table->dropForeign(['parthner_id']);
            $table->dropForeign(['client_id']);
            $table->dropForeign(['workshop_id']);
            $table->dropForeign(['addressee_id']);
            $table->dropForeign(['pick_up_point_id']);
            $table->dropForeign(['delivery_point_id']);
            $table->dropForeign(['courier_receiver_id']);
            $table->dropForeign(['courier_issuer_id']);
            $table->dropForeign(['master_id']);
            $table->dropForeign(['receiver_id']);
        });
        Schema::dropIfExists('orders');
    }
}

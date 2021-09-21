<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParthnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parthners', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->unsignedInteger('manager_id');
            $table->string('phone');
            $table->text('email');
            $table->text('comment')->nullable();
            $table->timestamps();
        });

        Schema::table('parthners', function (Blueprint $table) {
            $table->foreign('manager_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parthners', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
        });
        Schema::dropIfExists('parthners');
    }
}

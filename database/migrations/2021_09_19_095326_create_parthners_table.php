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
            $table->string('manager');
            $table->string('phone');
            $table->text('email');
            $table->text('comment')->nullable();
            $table->string('password');
            $table->text('notification_url');
            $table->unsignedInteger('role_id')->default(\App\Enums\UserType::PARTHNER);
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parthners');
    }
}

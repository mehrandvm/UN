<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuildingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buildings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("code");
            $table->double('lat', 10, 6);
            $table->double('long', 10, 6);
            $table->double('area_size', 10, 2);
            $table->unsignedInteger('area_size_unit');
            $table->foreign('area_size_unit')->references("id")->on('area_units');
            $table->double('utm_x', 10, 6);
            $table->double('utm_y', 10, 6);
            $table->integer('utm_zone');
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
        Schema::dropIfExists('buildings');
    }
}

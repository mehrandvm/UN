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
            $table->increments('id');
            $table->string("code")->nullable();
            $table->double('lat', 10, 6);
            $table->double('long', 10, 6);
            $table->geometry('geom');
            $table->double('area_size', 10, 2)->nullable();
            $table->unsignedInteger('area_size_unit')->nullable();
            $table->foreign('area_size_unit')->references("id")->on('area_units');
            $table->double('utm_x', 10, 6)->nullable();
            $table->double('utm_y', 10, 6)->nullable();
            $table->integer('utm_zone')->nullable();
            $table->unsignedInteger('subdivision');
            $table->foreign('subdivision')->references("id")->on('country_subdivisions');
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

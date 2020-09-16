<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuildingVisitTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('building_visit', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('building_id');
            $table->unsignedInteger('incident_id')->nullable();
            $table->foreign('building_id')->references('id')->on('buildings');
            $table->foreign('incident_id')->references('id')->on('incidents');
            
            $table->integer('stage_number');
            $table->boolean('is_wall_damaged');
            $table->string('referrence_code')->nullable();

            $table->unsignedInteger('objection')->nullable();
            $table->unsignedInteger('agent_id');
            $table->foreign('objection')->references('id')->on('objections');
            $table->foreign('agent_id')->references('id')->on('users');

            $table->string("issued")->nullable();

            $table->date('visit_date');
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
        Schema::dropIfExists('building_visit');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AgentVisitTaskCountrySubdivision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_visit_task_country_subdivision', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('agent_id');
            $table->unsignedInteger('country_subdivision_id');
            $table->unsignedInteger('assigned_by');

            $table->foreign('agent_id')->references('id')->on('users');
            $table->foreign('country_subdivision_id')->references('id')->on('country_subdivisions');
            $table->foreign('assigned_by')->references('id')->on('users');

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
        Schema::dropIfExists('agent_visit_task_country_subdivision');
    }
}

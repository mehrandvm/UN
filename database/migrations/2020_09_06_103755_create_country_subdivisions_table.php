<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountrySubdivisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('country_subdivisions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('subdivision_name');
            $table->integer('amar_village_code');
            $table->integer('household_count')->nullable();
            $table->integer('population_count')->nullable();
            $table->integer('females_count')->nullable();
            $table->integer('males_count')->nullable();
            $table->integer('building_unit_count')->nullable();
            $table->boolean('is_residency_permanent')->nullable();

            $table->unsignedInteger('roof_type_id')->nullable();
            $table->foreign('roof_type_id')->references('id')->on('roof_types');

            $table->unsignedInteger('cathedra_type_id')->nullable();
            $table->foreign('cathedra_type_id')->references('id')->on('cathedra_types');

            $table->boolean('is_one_story')->nullable();

            $table->unsignedInteger('foudation_construction_material_id')->nullable();
            $table->foreign('foudation_construction_material_id')->references('id')->on('construction_materials');
            $table->unsignedInteger('walls_construction_material_id')->nullable();
            $table->foreign('walls_construction_material_id')->references('id')->on('construction_materials');
            $table->unsignedInteger('roof_construction_material_id')->nullable();
            $table->foreign('roof_construction_material_id')->references('id')->on('construction_materials');
            $table->unsignedInteger('window_construction_material_id')->nullable();
            $table->foreign('window_construction_material_id')->references('id')->on('construction_materials');

            // $table->integer('unique_code');
            $table->unsignedInteger('type');
            $table->foreign('type')->references('id')->on('country_subdivision_types');

            $table->unsignedInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('country_subdivisions');

            // $table->polygon('area')->nullable();
            $table->unsignedInteger('controlled_by_admin');
            $table->foreign('controlled_by_admin')->references('id')->on('users');
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
        Schema::dropIfExists('country_subdivisions');
    }
}

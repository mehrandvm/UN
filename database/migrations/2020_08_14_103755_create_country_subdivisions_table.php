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
            $table->uuid('id');
            $table->string('subdivision_name');
            $table->integer('amar_village_code');
            $table->integer('household_count');
            $table->integer('population_count');
            $table->integer('females_count');
            $table->integer('males_count');
            $table->integer('building_unit_count');
            $table->boolean('is_residency_permanent');
            $table->foreign('roof_type_id')->references('id')->on('roof_types');
            $table->foreign('cathedra_type_id')->references('id')->on('cathedra_types');
            $table->boolean('is_one_story');
            $table->foreign('foudation_construction_material_id')->references('id')->on('construction_materials');
            $table->foreign('walls_construction_material_id')->references('id')->on('construction_materials');
            $table->foreign('roof_construction_material_id')->references('id')->on('construction_materials');
            $table->foreign('window_construction_material_id')->references('id')->on('construction_materials');
            $table->integer('unique_code');
            $table->foreign('type')->references('id')->on('country_subdivision_types');
            $table->unsignedInteger('parent_id')->nullable()->after('id');
            $table->foreign('parent_id')->references('id')->on('country_subdivisions');
            $table->polygon('area');
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

<?php

use App\CountrySubdivision;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class CountrySubdivisionVisitTasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('agent_visit_task_country_subdivision')->insert(
            array(
                'agent_id' => User::where('username', 'Mahmoodian.m')->first()->id,
                'country_subdivision_id' => CountrySubdivision::where("amar_village_code", "0512352026")->first()->id,
                'assigned_by' => User::where('username', 'mahmoodian.b')->first()->id,
                'created_at' => new \DateTime(),
                'updated_at' => new \DateTime()
            )
        );
        DB::table('agent_visit_task_country_subdivision')->insert(
            array(
                'agent_id' => User::where('username', 'MehranDVM')->first()->id,
                'country_subdivision_id' => CountrySubdivision::where("amar_village_code", "0512352026")->first()->id,
                'assigned_by' => User::where('username', 'mahmoodian.b')->first()->id,
                'created_at' => new \DateTime(),
                'updated_at' => new \DateTime()
            )
        );
    }
}

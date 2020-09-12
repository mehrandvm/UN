<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BuildingVisitTaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $buildings = App\Building::all();
        foreach ($buildings as $building) {
            $stage = rand(1, 4);
            for ($i = 1; $i <= $stage; $i++) {
                DB::table('building_visit')->insert(
                    array(
                        'building_id' => $building->id,
                        'incident_id' => null,
                        'stage_number' => $i,
                        'is_wall_damaged' => rand()%2 == 0 ? true : false, 
                        'objection' => null,
                        'agent_id' => App\User::find(rand()%3 + 1)->id,
                        'visit_date' => new \DateTime(),
                        'created_at' => new \DateTime(),
                        'updated_at' => new \DateTime()
                    )
                );
            }
        }
    }
}

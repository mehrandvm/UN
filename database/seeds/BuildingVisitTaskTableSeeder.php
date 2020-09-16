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
            $case_number = rand()%9000 + 1000;
            $agent_id = App\User::find(rand()%3 + 1)->id;
            $wall_damage = rand()%2 == 0 ? true : false;
            $damage_type = rand()%5 + 1;
            for ($i = 1; $i <= $stage; $i++) {
                DB::table('building_visit')->insert(
                    array(
                        'building_id' => $building->id,
                        'incident_id' => null,
                        'stage_number' => $i,
                        'referrence_code' => $case_number,
                        'is_wall_damaged' => $wall_damage, 
                        'damage_type' => $damage_type,
                        'objection' => null,
                        'agent_id' => $agent_id,
                        'visit_date' => new \DateTime(),
                        'created_at' => new \DateTime(),
                        'updated_at' => new \DateTime()
                    )
                );
            }
        }
    }
}

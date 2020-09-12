<?php

use Illuminate\Database\Seeder;
use App\Building;
use App\CountrySubdivision;
class BuildingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $csv = fopen("data/csv/buildings.csv", "r");
        while (($row = fgetcsv($csv, 1000, ",")) !== FALSE) {
            
            $building = new Building();
            $building->lat = $row[6];
            $building->long = $row[0];
            $building->area_size = $row[2];
            $building->utm_x = $row[3];
            $building->utm_y = $row[4];
            $building->utm_zone = $row[5];
            $parent = CountrySubdivision::where('amar_village_code', $row[7])->first();
            $building->subdivision = $parent->id;
            $building->save();
        }
        fclose($csv);
    }
}

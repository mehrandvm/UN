<?php

use Illuminate\Database\Seeder;
use App\CountrySubdivision;

class CountrySubdivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $national = new CountrySubdivision();
        $national->id = 0;
        $national->subdivision_name = "Iran";
        $national->amar_village_code = "00";
        $national->household_count = 0;
        $national->population_count = 0;
        $national->females_count = 0;
        $national->males_count = 0;
        $national->type = 1;
        $national->parent_id = null;
        $national->save();

        $csv = fopen("data/csv/country_subdivision_kermanshah.csv", "r");
        while (($row = fgetcsv($csv, 1000, ",")) !== FALSE) {
            $subdivision = new CountrySubdivision;
            $subdivision->subdivision_name = $row[0];
            $subdivision->amar_village_code = $row[1];
            $subdivision->household_count = $row[2];
            $subdivision->population_count = $row[3];
            $subdivision->females_count = $row[4];
            $subdivision->males_count = $row[5];
            $subdivision->type = $row[6];
            $parent = CountrySubdivision::where('amar_village_code', $row[7])->first();
            $subdivision->parent_id = $parent->id;
            $subdivision->save();
        }
        fclose($csv);

        $ezgeleh = new CountrySubdivision;
        $ezgeleh->subdivision_name = "ازگله";
        $ezgeleh->amar_village_code = "05120001";
        $ezgeleh->household_count = 421;
        $ezgeleh->population_count = 1809;
        $ezgeleh->females_count = 804;
        $ezgeleh->males_count = 1005;
        $ezgeleh->type = 4;
        $parent = CountrySubdivision::where('amar_village_code', "0512")->first();
        $ezgeleh->parent_id = $parent->id;
        $ezgeleh->save();
    }
}

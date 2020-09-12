<?php

use Illuminate\Database\Seeder;
use App\CountrySubdivisionType;

class CountrySubdivisionTypesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $country = new CountrySubdivisionType();
        $country->type_name = "Country";
        $country->parent_id = null;
        $country->save();

        $province = new CountrySubdivisionType();
        $province->type_name = "Province";
        $province->parent_id = $country->id;
        $province->save();

        $county = new CountrySubdivisionType();
        $county->type_name = "County";
        $county->parent_id = $province->id;
        $county->save();

        $village = new CountrySubdivisionType();
        $village->type_name = "Village";
        $village->parent_id = $county->id;
        $village->save();
    }
}

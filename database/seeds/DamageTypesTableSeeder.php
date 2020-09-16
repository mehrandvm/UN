<?php

use App\DamageType;
use Illuminate\Database\Seeder;

class DamageTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $type1 = new DamageType();
        $type1->name = "احداثی نوع 1";
        $type1->save();

        $type2 = new DamageType();
        $type2->name = "احداثی نوع 2";
        $type2->save();

        $type3 = new DamageType();
        $type3->name = 'تعمیری الف';
        $type3->save();

        $type4 = new DamageType();
        $type4->name = 'تعمیری ب';
        $type4->save();

        $type5 = new DamageType();
        $type5->name = 'بدون آسیب';
        $type5->save();
    }
}

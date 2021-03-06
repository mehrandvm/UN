<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(CountrySubdivisionTypesSeed::class);
        $this->call(CountrySubdivisionSeeder::class);
        $this->call(BuildingsTableSeeder::class);
        $this->call(ObjectionTableSeeder::class);
        $this->call(DamageTypesTableSeeder::class);
        $this->call(BuildingVisitTaskTableSeeder::class);
        $this->call(CountrySubdivisionVisitTasksTableSeeder::class);
        
    }
}

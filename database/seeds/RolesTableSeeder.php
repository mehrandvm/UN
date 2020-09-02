<?php

use Illuminate\Database\Seeder;
use App\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $test_role = new Role();
		$test_role->slug = 'test';
		$test_role->name = 'Test';
        $test_role->save();


        $admin_role = new Role();
		$admin_role->slug = 'admin';
		$admin_role->name = 'Admin';
        $admin_role->save();
        $permissions = App\Permission::all();
        foreach ($permissions as $permission) {
            $admin_role->permissions()->attach($permission);
            $test_role->permissions()->attach($permission);
        }

        $agent_role = new Role();
		$agent_role->slug = 'agent';
        $agent_role->name = 'Agent';
        $agent_role->save();


        
        
    }
}

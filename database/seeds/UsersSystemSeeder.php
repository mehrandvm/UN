<?php

use Illuminate\Database\Seeder;
use App\Permission;
use App\Role;
use App\User;

class UsersSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin_role = new Role();
		$admin_role->slug = 'admin';
		$admin_role->name = 'Admin';
		$admin_role->save();

        $agent_role = new Role();
		$agent_role->slug = 'agent';
        $agent_role->name = 'Agent';
        $agent_role->save();
        
        $createTasks = new Permission();
		$createTasks->slug = 'create-tasks';
		$createTasks->name = 'Create Tasks';
        $createTasks->save();
        
        $editUsers = new Permission();
		$editUsers->slug = 'edit-users';
		$editUsers->name = 'Edit Users';
        $editUsers->save();
        
        $admin_role->permissions()->attach($createTasks);
        $admin_role->permissions()->attach($editUsers);

        $agent1 = new User();
		$agent1->f_name = 'Mahdi';
		$agent1->l_name = 'Mahmoodian';
		$agent1->phone_number = '+989199069657';
		$agent1->email = 'mahmoodian.m1999@gmail.com';
		$agent1->username = 'Mahmoodian.m';
		$agent1->password = bcrypt('12341234');
		$agent1->save();
		$agent1->roles()->attach($agent_role);
        
        $agent2 = new User();
		$agent2->f_name = 'Mojtaba';
		$agent2->l_name = 'Rahimy';
		$agent2->phone_number = '+989212759133';
		$agent2->email = 'm.rahimy.gk@gmail.com';
		$agent2->username = 'Rahimy.m';
		$agent2->password = bcrypt('asdf1234');
		$agent2->save();
		$agent2->roles()->attach($agent_role);

		$admin = new User();
		$admin->f_name = 'Behnam';
		$admin->l_name = 'Mahmoodian';
		$admin->phone_number = '+989121350736';
		$admin->email = 'bm.ir1967@gmail.com';
		$admin->username = 'mahmoodian.b';
		$admin->password = bcrypt('password');
		$admin->save();
        $admin->roles()->attach($admin_role);
        $admin->permissions()->attach($createTasks);
        $admin->permissions()->attach($editUsers);
    }
}

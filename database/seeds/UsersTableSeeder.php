<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $agent_role = App\Role::where('slug', 'agent')->first();
        $admin_role = App\Role::where('slug', 'admin')->first();

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
		
		$demo = new User();
		$demo->f_name = 'Demo';
		$demo->l_name = 'Demo';
		$demo->phone_number = '+989121234567';
		$demo->email = 'demo';
		$demo->username = 'demo';
		$demo->password = bcrypt('chakad');
		$demo->save();
        $demo->roles()->attach($admin_role);
    }
}

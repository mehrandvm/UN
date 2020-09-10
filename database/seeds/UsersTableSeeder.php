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

		$agent3 = new User();
		$agent3->f_name = 'Mehran';
		$agent3->l_name = 'Daneshvar';
		$agent3->phone_number = '+989911927936';
		$agent3->email = '"amir.daneshvarmoein@gmail.com"';
		$agent3->username = 'MehranDVM';
		$agent3->password = bcrypt('12345678');
		$agent3->save();
		$agent3->roles()->attach($agent_role);

		$admin = new User();
		$admin->f_name = 'Behnam';
		$admin->l_name = 'Mahmoodian';
		$admin->phone_number = '+989121350736';
		$admin->email = 'bm.ir1967@gmail.com';
		$admin->username = 'mahmoodian.b';
		$admin->password = bcrypt('chakad@2020');
		$admin->save();
		$admin->roles()->attach($admin_role);
		
		$coordinator1 = new User();
		$coordinator1->f_name = 'Srinivasa';
		$coordinator1->l_name = 'Popuri';
		$coordinator1->phone_number = '+123456789';
		$coordinator1->email = 'srinivasa.popuri@un.org';
		$coordinator1->username = 'srinivasa';
		$coordinator1->password = bcrypt('chakad2020');
		$coordinator1->save();
		$coordinator1->roles()->attach($admin_role);

		$coordinator2 = new User();
		$coordinator2->f_name = 'Soma';
		$coordinator2->l_name = 'Ahmadi';
		$coordinator2->phone_number = '+98123456789';
		$coordinator2->email = 'soma.ahmadi@un.org';
		$coordinator2->username = 's.ahmadi';
		$coordinator2->password = bcrypt('chakad2020');
		$coordinator2->save();
		$coordinator2->roles()->attach($admin_role);
		
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

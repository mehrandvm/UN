<?php

use Illuminate\Database\Seeder;
use App\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $manageUsers = new Permission();
		$manageUsers->slug = 'manage-users';
		$manageUsers->name = 'Manage Users';
        $manageUsers->save();

        $manageRoles = new Permission();
		$manageRoles->slug = 'manage-roles';
		$manageRoles->name = 'Manage Roles';
        $manageRoles->save();

        $manageTasks = new Permission();
		$manageTasks->slug = 'manage-tasks';
		$manageTasks->name = 'Manage Tasks';
        $manageTasks->save();

        $viewDashboard = new Permission();
		$viewDashboard->slug = 'view-dashboard';
		$viewDashboard->name = 'View Dashboard';
        $viewDashboard->save();

        $national = new Permission();
		$national->slug = 'national-access';
		$national->name = 'National Access';
        $national->save();

        $province = new Permission();
		$province->slug = 'province-access';
		$province->name = 'Porvince Access';
        $province->save();
    }
}

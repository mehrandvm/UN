<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User; 
use App\Permission;
use Illuminate\Support\Facades\Auth; 


class ManagementController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;

    public function getPermissions(){
        $user = Auth::user(); 
        foreach($user->permissions() as $permission){
            dd($permission);
        }
        dd($user->permissions());
        return "all permissions";
        
    }

    public function hasPermissions(String $permission_str){
        $user = Auth::user(); 
        $permission = Permission::where('slug', $permission_str)->first();
        if($user->hasPermissionTo($permission)){
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
            ]);
        }else{
            return response()->json([
                'status_code' => $this->forbiddenStatus,
                'status_message' => 'Forbidden',
            ]);
        }
    }
}

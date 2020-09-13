<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User; 
use App\Permission;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Role;

class ManagementController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 404;

    public function getPermissions(){
        $user = Auth::user(); 
        foreach($user->permissions() as $permission){
            dd($permission);
        }
        return "all permissions";
        
    }

    public function hasPermissions(String $permission_str){
        $user = Auth::user(); 
        $permission = Permission::where('slug', $permission_str)->first();
        if($permission && $user->hasPermissionTo($permission)){
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

    public function getAllUsers(){
        $user = Auth::user(); 

        $users = User::all();
        foreach($users as $u){
            foreach ($u->getUserRoles() as $role) {
                $roles[] = $role->getInfo();
            }
            $u['roles'] = $roles;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $users
        ]);


        // $permission = Permission::where('slug', "manage-users")->first();
        // if($user->hasPermissionTo($permission)){
        //     $data = User::all();
        //     return response()->json([
        //         'status_code' => $this->successStatus,
        //         'status_message' => 'Success',
        //         'data' =>[
        //             $data
        //         ]
        //     ]);
        // }else{
        //     return response()->json([
        //         'status_code' => $this->forbiddenStatus,
        //         'status_message' => 'Forbidden',
        //     ]);
        // }
    }
    
    public function getUser($userId){
        $user = Auth::user(); 
        $target = User::find($userId);
        foreach ($target->getUserRoles() as $role) {
            $roles[] = $role->getInfo();
        }
        $target['roles'] = $roles;
        if ($target) {
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $target
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Can\'t Kill the Dead :)',
            ]);
        }
    }

    public function addUser(Request $request){
        $user = Auth::user(); 
        
        $validator = Validator::make($request->all(),[ 
            'f_name' => 'required', 
            'l_name' => 'required', 
            'username' => 'required', 
            'phone_number' => 'required',
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
            'role_slug' => 'required'
        ]);
        if ($validator->fails()) { 
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error'=>$validator->errors()
            ]);          
        }else{
            $input = $request->all(); 
            $input['password'] = bcrypt($input['password']); 
            $target = User::create($input);
            $role = Role::where('slug', $request->role_slug)->first();
            $target->roles()->attach($role);
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'New User Successfully Created',
            ]);
        }
    }

    public function updateUser(Request $request, $userId){
        $user = Auth::user(); 
        $target = User::find($userId);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'User Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'User not found',
            ]);
        }
    }

    public function deleteUser($userId){
        $user = Auth::user(); 
        $target = User::find($userId);
        if ($target) {
            $target->delete();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'New User Successfully Deleted',
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Can\'t Kill the Dead :)',
            ]);
        }
        
    }

    public function getPerson($id){
        $user = Auth::user(); 
        $persons = [
            [
                "name" => "ابراهیم محمدی",
                "id" => "0028347804"
            ],
            [
                "name" => "حسن محسنی",
                "id" => "0144931174"
            ],
            [
                "name" => "ابراهیم محمدی",
                "id" => "0046590231"
            ],
        ];
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'success',
            'data' => $persons[$id % 3]
        ]);
    }
}

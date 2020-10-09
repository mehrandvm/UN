<?php

namespace App\Http\Controllers\api\v1;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;
    public $unauthorisedStatus = 401;
    public $forbiddenStatus = 403;
    //

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $today = new \DateTime();
            $expire_date = new \DateTime($user->expiration_date);
            if ($expire_date < $today) {
                return response()->json([
                    'status_code' => $this->forbiddenStatus,
                    'status_message' => 'Forbidden',
                    'data' => "User is expired"
                ]); 
            }
            $success['token'] =  $user->createToken('AccToken')-> accessToken; 
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $success
            ]); 
        } 
        else{ 
            return response()->json([
                'status_code' => $this->unauthorisedStatus,
                'status_message' => 'Unauthorised',
            ]); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'first_name' => 'required', 
            'last_name' => 'required', 
            'username' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('AccToken')-> accessToken; 
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], $this->successStatus); 
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function profile() 
    { 
        $user = Auth::user(); 
        $roles = [];
        foreach ($user->getUserRoles() as $role) {
            $roles[] = $role->getInfo();
        }
        $user['roles'] = $roles;


        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $user
        ]); 
    }
}

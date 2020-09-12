<?php

namespace App\Http\Controllers\api\v1;

use App\Building;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;
use App\User;
use App\CountrySubdivision;

class TaskController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 404;


    public function addSubdivisionTask(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'agent_id' => 'required',
            'country_subdivision_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error' => $validator->errors()
            ]);
        } else {
            DB::table('agent_visit_task_country_subdivision')->insert(
                array(
                    'agent_id' => $request->agent_id,
                    'country_subdivision_id' => $request->country_subdivision_id,
                    'assigned_by' => $user->id,
                    'created_at' => new \DateTime(),
                    'updated_at' => new \DateTime()
                )
            );
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Task assigned successfully',
            ]);
        }
    }

    public function getSubdivisionTasks(){
        $user = Auth::user(); 
        $subdivision_visit_tasks = DB::table('agent_visit_task_country_subdivision')->get();
        $results = [];

        foreach($subdivision_visit_tasks as $task){
            $result = [
                'agent' => User::find($task->agent_id),
                'subdivision' => CountrySubdivision::find($task->country_subdivision_id),
                'assigned_by' => User::find($task->assigned_by)
            ];
            $results[] = $result;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $results
        ]);
    }

    public function getBuildingVisitTasks(){
        $user = Auth::user(); 
        $building_visit_tasks = DB::table('building_visit')->where('agent_id', $user->id)->get();
        $results = [];

        foreach($building_visit_tasks as $task){
            $building = Building::find($task->building_id);
            $subdivison = CountrySubdivision::find(871);
            $task->agent = $user;
            $task->buidling = $building;
            $task->subdivision = $subdivison;
            $results[] = $task;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $results
        ]);

    }
}

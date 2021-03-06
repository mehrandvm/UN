<?php

namespace App\Http\Controllers\api\v1;

use App\Building;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\User;
use App\CountrySubdivision;
use App\DamageType;
use App\Objection;

class TaskController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 401;

    public function summarizeTasks()
    {
        $user = Auth::user();
        $subdivisonsNames = [];
        $subdivisons = DB::table('agent_visit_task_country_subdivision')
            ->where('agent_id', $user->id)->get();
        foreach ($subdivisons as $subdivison) {
            $subdivisonsNames[] = CountrySubdivision::find($subdivison->country_subdivision_id)->subdivision_name;
        }
        $visits = DB::table('building_visit')->where('agent_id', $user->id);
        $stageOne = (clone $visits)->where('stage_number', 1);
        $stageTwo = (clone $visits)->where('stage_number', 2);
        $stageThree = (clone $visits)->where('stage_number', 3);
        $stageFour = (clone $visits)->where('stage_number', 4);
        $stagesSummarize = [
            'stage_1' => [
                'total_visits' => (clone $stageOne)->count(),
                'issued' => (clone $stageOne)->whereNotNull('issued')->count(),
                'objections' => (clone $stageOne)->whereNotNull('objection')->count()
            ],
            'stage_2' => [
                'total_visits' => (clone $stageTwo)->count(),
                'issued' => (clone $stageTwo)->whereNotNull('issued')->count(),
                'objections' => (clone $stageTwo)->whereNotNull('objection')->count()
            ],
            'stage_3' => [
                'total_visits' => (clone $stageThree)->count(),
                'issued' => (clone $stageThree)->whereNotNull('issued')->count(),
                'objections' => (clone $stageThree)->whereNotNull('objection')->count()
            ],
            'stage_4' => [
                'total_visits' => (clone $stageFour)->count(),
                'issued' => (clone $stageFour)->whereNotNull('issued')->count(),
                'objections' => (clone $stageFour)->whereNotNull('objection')->count()
            ],
        ];

        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => [
                'subdivisions' => $subdivisonsNames,
                'summarize' => $stagesSummarize
            ]
        ]);
    }


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

    public function getSubdivisionTasks()
    {
        $user = Auth::user();
        $subdivision_visit_tasks = DB::table('agent_visit_task_country_subdivision')->get();
        $results = [];

        foreach ($subdivision_visit_tasks as $task) {
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

    public function getBuildingVisitTasks()
    {
        $user = Auth::user();
        $building_visit_tasks = DB::table('building_visit')->where('agent_id', $user->id)->get();
        $results = [];
        foreach ($building_visit_tasks as $task) {
            $building = Building::find($task->building_id);
            $damage_type = DamageType::find($task->damage_type);
            $subdivison = CountrySubdivision::find($building->subdivision);
            $task->subdivision = $subdivison->subdivision_name;
            $task->damage_type = $damage_type->name;
            $task->incident = "Earth quake";
            unset($task->created_at, $task->updated_at, $task->agent_id, $task->building_id, $task->incident_id);
            $results[] = $task;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $results
        ]);
    }

    public function addObjection(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'referrence_code' => 'required',
            'expression' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error' => $validator->errors()
            ]);
        } else {
            $objection = new Objection();
            $objection->expression = $request->expression;
            $objection->save();
            $case = $building_visit_tasks = DB::table('building_visit')->where('id', $request->referrence_code)->first();
            $case->objection = $objection->id;
            $case->save();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Objection created successfully',
            ]);
        }
    }


    public function getObjection($id)
    {
        $user = Auth::user();
        $objection = Objection::find($id);
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => [
                'expression' => $objection->expression,
                'resoponse' => $objection->response,
            ]
        ]);
    }

    public function reviewObjection(Request $request, $objectionId)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'response' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error' => $validator->errors()
            ]);
        } else {
            $objection = Objection::find($objectionId);
            $objection->response = $request->response;
            $objection->save();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Response to objection saved successfully',
            ]);
        }
    }
}

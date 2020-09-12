<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use DB;


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
                    'assigned_by' => $user->id
                )
            );
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Task assigned successfully',
            ]);
        }
    }
}

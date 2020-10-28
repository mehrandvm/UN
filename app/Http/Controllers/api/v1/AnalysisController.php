<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AnalysisController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 401;

    public function addIncident(Request $request){
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'lat' => 'required',
            'long' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error' => $validator->errors()
            ]);
        } else {
            $incident = new Incident();
            $incident->name = $request->name;
            $incident->lat = $request->lat;
            $incident->long = $request->long;
            $incident->save();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Incident added successfully',
            ]);
        }
    }
    public function getIncident(){
            $user = Auth::user();
            $forms = Incident::all();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $forms
            ]);
        }
}

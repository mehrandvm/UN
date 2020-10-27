<?php

namespace App\Http\Controllers\api\v1;

use App\Building;
use App\CountrySubdivision;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AgentController extends Controller
{
    public $successStatus = 200;
    public $badRequestStatus = 401;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;

    public function rootSubdivision(){
        $user = Auth::user();
        $subdivisions = DB::table('agent_visit_task_country_subdivision')
                        ->where('agent_id', $user->id)->select('country_subdivision_id')->get()->toArray();

        $root = $this->findParent($subdivisions, 0);
        if ($root) {
            foreach ($root as $value) {
                $value->name = CountrySubdivision::where('id', $value->country_subdivision_id)->first()->subdivision_name;
            }
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $root
            ]);
        } else {
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Not found',
            ]);
        }
    }

    public function getChildSubdivision($id){
        $user = Auth::user();
        $subdivisions = DB::table('agent_visit_task_country_subdivision')
                        ->where('agent_id', $user->id)->select('country_subdivision_id')->get()->toArray();

        
        foreach ($subdivisions as $value) {
            if ($value->country_subdivision_id == $id) {
                return response()->json([
                    'status_code' => $this->successStatus,
                    'status_message' => 'Success',
                    'data' => null
                ]);
            }
        }
        $root = $this->findParent($subdivisions, $id);
        if ($root) {
            foreach ($root as $value) {
                $value->name = CountrySubdivision::where('id', $value->country_subdivision_id)->first()->subdivision_name;
            }
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $root
            ]);
        } else {
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Not found',
            ]);
        }
    }

    private function findParent($array, $target){
        if (empty($array)) {
            return [];
        }
        $first = array_shift($array);
        $subdivision = CountrySubdivision::find($first->country_subdivision_id);
        if (!$subdivision) {
            return null;
        }else if ($subdivision->parent_id == $target) {
            return array_merge([(object) ['country_subdivision_id' => $subdivision->id]], $this->findParent($array, $target));
        }else{
            $array = array_merge($array, [(object) ['country_subdivision_id' => $subdivision->parent_id]]);
            return $this->findParent($array, $target);
        }
    }

    public function addBuilding(Request $request){
        $user = Auth::user(); 
        $validator = Validator::make($request->all(), [
            'subdivision' => 'required',
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
            $building = new Building();
            $building->subdivision = $request->subdivision;
            $building->lat = $request->lat;
            $building->long = $request->long;
            $building->save();
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Building added successfully',
            ]);
        }
    }

    public function updateBuilding(Request $request, $id){
        $user = Auth::user(); 
        $target = Building::find($id);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Building Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Building not found',
            ]);
        }
    }

    public function updateSubdivision(Request $request, $id){
        $user = Auth::user(); 
        $target = CountrySubdivision::find($id);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Subdivision Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Subdivision not found',
            ]);
        }
    }
}

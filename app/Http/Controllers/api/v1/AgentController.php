<?php

namespace App\Http\Controllers\api\v1;

use App\CountrySubdivision;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AgentController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 404;

    public function rootSubdivision(){
        $user = Auth::user();
        $subdivisions = DB::table('agent_visit_task_country_subdivision')
                        ->where('agent_id', $user->id)->select('country_subdivision_id')->get();

        $root = $this->findParent($subdivisions->toArray(), 0);
        dd($root);
    }

    private function findParent($array, $target){
        if (empty($array)) {
            return [];
        }
        $first = array_shift($array);
        $subdivision = CountrySubdivision::find($first->country_subdivision_id);
        if ($subdivision->parent_id == $target) {
            return array_merge([(object) ['country_subdivision_id' => $subdivision->id]], $this->findParent($array, $target));
        }else{
            $array = array_merge($array, [(object) ['country_subdivision_id' => $subdivision->parent_id]]);
            return $this->findParent($array, $target);
        }
    }
}

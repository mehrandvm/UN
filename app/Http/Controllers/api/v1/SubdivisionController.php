<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CountrySubdivision;

class SubdivisionController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 401;


    public function getRootSubdivision()
    {
        $root = CountrySubdivision::where("parent_id", null)->first();
        if ($root) {
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $root
            ]);
        } else {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Invalid Request',
            ]);
        }
    }

    public function getSubdivision($id)
    {
        $target = CountrySubdivision::find($id);
        if ($target) {
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $target
            ]);
        } else {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Invalid Request',
            ]);
        }
    }

    public function getChildSubdivisions($id)
    {
        $children = CountrySubdivision::where("parent_id", $id)->get();
        if ($children) {
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Success',
                'data' => $children
            ]);
        } else {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Invalid Request',
            ]);
        }
    }
}

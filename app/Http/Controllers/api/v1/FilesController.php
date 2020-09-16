<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FilesController extends Controller
{

    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 401;


    public function storeIssuePdf(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'visit_id' => 'required',
            'file' => 'required|mimes:pdf',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error' => $validator->errors()
            ]);
        } else {
            $visit_task = DB::table('building_visit')->find($request->visit_id);
            $file_name = $visit_task->referrence_code . '_' . $visit_task->stage_number . '_' . time() . '.' . $request->file->extension();
            $request->file->move(public_path('uploads'), $file_name);

            DB::table('building_visit')->where('id', $request->visit_id)->update(['issued' => '/uploads/' . $file_name]);
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'File uploaded successfully',
                'data' => [
                    'url' => '/uploads/' . $file_name
                ]
            ]);
        }
    }
}

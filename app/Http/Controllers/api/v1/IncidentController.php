<?php

namespace App\Http\Controllers\api\v1;

use App\Category;
use App\Http\Controllers\Controller;
use App\Question;
use App\SurveyForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class IncidentController extends Controller
{
    public $successStatus = 200;
    public $forbiddenStatus = 403;
    public $notFoundStatus = 404;
    public $badRequestStatus = 404;


    public function addSurveyForm(Request $request){
        $user = Auth::user(); 
        
        $validator = Validator::make($request->all(),[ 
            'name' => 'required', 
            'incident' => 'required', 
        ]);
        if ($validator->fails()) { 
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error'=>$validator->errors()
            ]);          
        }else{
            $input = $request->all(); 
            $target = SurveyForm::create($input);
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'New Survey Form Successfully Created',
            ]);
        }
    }

    public function addCategory(Request $request){
        $user = Auth::user(); 
        
        $validator = Validator::make($request->all(),[ 
            'name' => 'required', 
            'weight' => 'required',
            'form' => 'required', 
        ]);
        if ($validator->fails()) { 
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error'=>$validator->errors()
            ]);          
        }else{
            $input = $request->all(); 
            $target = Category::create($input);
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'New Category Successfully Created',
            ]);
        }
    }

    public function addQuestion(Request $request){
        $user = Auth::user(); 
        
        $validator = Validator::make($request->all(),[ 
            'text' => 'required', 
            'rate' => 'required',
            'category' => 'required', 
        ]);
        if ($validator->fails()) { 
            return response()->json([
                'status_code' => $this->badRequestStatus,
                'status_message' => 'Bad request',
                'error'=>$validator->errors()
            ]);          
        }else{
            $input = $request->all(); 
            $target = Question::create($input);
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'New Question Successfully Created',
            ]);
        }
    }

    public function getAllSurveyForms(){
        $user = Auth::user(); 
        $forms = SurveyForm::all();
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $forms
        ]);
    }

    public function getAllCategories(){
        $user = Auth::user(); 
        $categories = Category::all();
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $categories
        ]);
    }

    public function getAllQuestions(){
        $user = Auth::user(); 
        $questions = Question::all();
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $questions
        ]);
    }
}

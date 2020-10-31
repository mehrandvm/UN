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
    public $badRequestStatus = 401;


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
        foreach($categories as $category){
            $form = SurveyForm::find($question->category);
            $category->survey_form_name = $form->name;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $categories
        ]);
    }

    public function getAllQuestions(){
        $user = Auth::user(); 
        $questions = Question::all();
        foreach($questions as $question){
            $category = Category::find($question->category);
            $question->category_name = $category->name;
            $question->category_weight = $category->weight;
        }
        return response()->json([
            'status_code' => $this->successStatus,
            'status_message' => 'Success',
            'data' => $questions
        ]);
    }

    public function updateSurveyForm(Request $request, $formId){
        $user = Auth::user(); 
        $target = SurveyForm::find($formId);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Survey Form Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Survey form not found',
            ]);
        }
    }

    public function updateCategory(Request $request, $categoryId){
        $user = Auth::user(); 
        $target = Category::find($categoryId);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Category Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Category not found',
            ]);
        }
    }

    public function updateQuestion(Request $request, $questionId){
        $user = Auth::user(); 
        $target = Question::find($questionId);
        if ($target) {
            $target->update($request->all());
            return response()->json([
                'status_code' => $this->successStatus,
                'status_message' => 'Question Successfully Updated',
                'updated' => $request->all()
            ]);
        }else{
            return response()->json([
                'status_code' => $this->notFoundStatus,
                'status_message' => 'Question not found',
            ]);
        }
    }
}

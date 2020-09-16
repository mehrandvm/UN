<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('user')->group(function () {
    Route::post('login', 'api\v1\UserController@login');
    Route::post('register', 'api\v1\UserController@register');
    Route::middleware(['auth:api'])->group(function () {
        Route::get('profile', 'api\v1\UserController@profile');
    });
});

Route::prefix('management')->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        Route::get('permission/{id}', 'api\v1\ManagementController@hasPermissions');
        
        Route::get('roles', 'api\v1\ManagementController@getRoles');

        Route::get('users', 'api\v1\ManagementController@getAllUsers');
        Route::post('users', 'api\v1\ManagementController@addUser');
        Route::get('users/{id}', 'api\v1\ManagementController@getUser');
        Route::post('users/{id}', 'api\v1\ManagementController@updateUser');
        Route::delete('users/{id}', 'api\v1\ManagementController@deleteUser');

        Route::get('subdivisions', 'api\v1\SubdivisionController@getRootSubdivision');
        Route::get('subdivisions/{id}', 'api\v1\SubdivisionController@getSubdivision');
        Route::get('subdivisions/child/{id}', 'api\v1\SubdivisionController@getChildSubdivisions');

        Route::get('tasks/summarize', 'api\v1\TaskController@summarizeTasks');

        Route::get('tasks/subdivision', 'api\v1\TaskController@getSubdivisionTasks');
        Route::post('tasks/subdivision', 'api\v1\TaskController@addSubdivisionTask');

        Route::get('tasks/building', 'api\v1\TaskController@getBuildingVisitTasks');

        Route::get('tasks/objection/{id}', 'api\v1\TaskController@getObjection');

        Route::get('persons/{id}', 'api\v1\ManagementController@getPerson');

        Route::post('files/bank-issue', 'api\v1\FilesController@storeIssuePdf');
    });
});

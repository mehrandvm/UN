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
        Route::post('profile', 'api\v1\UserController@profile');
    });
});

Route::prefix('management')->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        Route::get('permission', 'api\v1\ManagementController@getPermissions');
        Route::get('permission/{id}', 'api\v1\ManagementController@hasPermissions');
    });
});

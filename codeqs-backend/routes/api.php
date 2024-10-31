<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/courses', [CourseController::class, 'save']);
Route::get('/courses', [CourseController::class, 'list']);
Route::delete('/courses/{id}', [CourseController::class, 'delete']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/{id}', [CourseController::class, 'update']);

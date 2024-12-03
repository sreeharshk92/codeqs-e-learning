<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;


use App\Http\Controllers\Api\UserInfoController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/add-categories', [CategoryController::class, 'store']);

Route::post('/courses', [CourseController::class, 'save']);
Route::get('/courses', [CourseController::class, 'list']);
Route::delete('/courses/{id}', [CourseController::class, 'delete']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::post('/personal', [UserInfoController::class, 'userinfo']);
Route::get('/show',[UserInfoController::class, 'show']);
Route::get('/payments-list',[PaymentController::class, 'paymentsList']);

Route::post('/create-order', [PaymentController::class, 'createOrder']);
Route::post('/verify-payment', [PaymentController::class, 'verifyPayment']);

Route::get('/search-courses/{key}',[CourseController::class,'searchCourses']);





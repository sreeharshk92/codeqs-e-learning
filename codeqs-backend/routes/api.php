<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\UserInfoController;
use App\Http\Controllers\Api\WorkshopCategoryController;
use App\Http\Controllers\Api\WorkshopController;
use App\Http\Controllers\Api\WorkshopVideosController;
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

Route::prefix('workshopcategory')->name('workshopcategory.')->group(function() {
    Route::post('categorycreate', [WorkshopCategoryController::class, 'create'])->name('categorycreate');
    Route::get('categorylist', [WorkshopCategoryController::class, 'list'])->name('categorylist');
    Route::delete('/categorydelete/{id}', [WorkshopCategoryController::class, 'delete'])->name('categorydelete');
    Route::get('categoryshow/{id}', [WorkshopCategoryController::class, 'show'])->name('categoryshow');
    Route::post('categoryupdate/{id}', [WorkshopCategoryController::class, 'update'])->name('categoryupdate');
});
Route::prefix('workshop')->name('workshop.')->group(function() {
    Route::post('productcreate', [WorkshopController::class, 'store'])->name('productcreate');
    Route::get('productlist', [WorkshopController::class, 'list'])->name('productlist');
    Route::delete('/productdelete/{id}', [WorkshopController::class, 'delete'])->name('productdelete');
    Route::get('productshow/{id}', [WorkshopController::class, 'show'])->name('productshow');
    Route::put('productupdate/{id}', [WorkshopController::class, 'update'])->name('productupdate');

});
Route::prefix('workshopvideo')->name('workshopvideo.')->group(function() {
    Route::post('videocreate', [WorkshopVideosController::class, 'store'])->name('videocreate');
    Route::get('videolist', [WorkshopVideosController::class, 'list'])->name('videolist');
    Route::delete('/videodelete/{id}', [WorkshopVideosController::class, 'delete'])->name('videodelete');
    Route::get('videoshow/{id}', [WorkshopVideosController::class, 'show'])->name('videoshow');
    Route::put('videoupdate/{id}', [WorkshopVideosController::class, 'update'])->name('videoupdate');

});




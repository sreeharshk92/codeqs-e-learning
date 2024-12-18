<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserinfoSaveRequest;
use App\Models\Userinfo;

class UserInfoController extends Controller
{
    public function userinfo(UserinfoSaveRequest $request) // Use the custom request for validation
    {
        // The validated data will automatically be available
        $validatedData = $request->validated();

        // Create the user info
        Userinfo::create($validatedData); // Use validated data

        return response()->json(['message' => 'User info saved successfully!'], 201);
    }
    public function show(){
        $userinfo = Userinfo::latest()->get();
        return response()->json($userinfo);
    }
}

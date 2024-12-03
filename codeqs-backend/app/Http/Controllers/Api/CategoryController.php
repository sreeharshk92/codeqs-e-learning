<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Fetch all categories
    public function index()
    {
        try {
            // Get all categories
            $categories = Category::all();
            // Return the categories as JSON
            return response()->json($categories, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }


    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
    
        try {
            // Create a new category
            $category = Category::create(['name' => $request->name]);
    
            // Return a success response with the created category
            return response()->json($category, 201);
        } catch (\Exception $e) {
            
    
            // Return a 500 error response
            return response()->json(['error' => 'Failed to add category'], 500);
        }
    }
    
}

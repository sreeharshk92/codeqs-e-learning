<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkshopCategorySaveRequest;
use App\Models\WorkshopCategory;
use Illuminate\Http\Request;

class WorkshopCategoryController extends Controller
{
    public function create(WorkshopCategorySaveRequest $request)
    {
        $input = $request->validated();
        WorkshopCategory::create($input);
        return response()->json(['message' => 'Category saved successfully.'], 201);
    }
    public function list()
    {
        $categories = WorkshopCategory::paginate(10); // Adjust the number as needed
        return response()->json($categories);
    }

    public function delete($id)
    {

        // Find the category
        $category = WorkshopCategory::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully.'], 201);
    }
    public function show($id)
    {
        $category = WorkshopCategory::findOrFail($id);
        return response()->json($category);
    }
    public function update(WorkshopCategorySaveRequest $request, $id)
    {
        // Find the category by ID
        $category = WorkshopCategory::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validated();

        // Update the category with the validated data
        $category->update($validatedData);

        // Return a success response
        return response()->json(['message' => 'Category updated successfully.'], 200);
    }
}

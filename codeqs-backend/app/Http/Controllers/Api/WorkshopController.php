<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkshopSaveRequest;
use App\Models\Workshop;
use App\Models\WorkshopCategory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class WorkshopController extends Controller
{
    public function store(WorkshopSaveRequest $request)
    {
        $input = $request->validated();

        // Handle image upload
        if ($request->hasFile('images')) {
            $extension = $request->images->extension();
            $filename = Str::random(6) . "-" . time() . "_workshop." . $extension;
            $request->images->storeAs('images', $filename);
            $input['images'] = $filename;
        }

        $workshop = Workshop::create($input);
        return response()->json(['message' => 'Workshop saved successfully.', 'data' => $workshop], 201);
    }

    public function list()
    {
        $workshops = Workshop::with('category')->paginate(10);
        return response()->json($workshops);
    }

    public function delete($id)
    {
        $workshop = Workshop::findOrFail($id);
        if ($workshop->images) {
            Storage::delete('images/' . $workshop->images);
        }
        $workshop->delete();
        return response()->json(['message' => 'Workshop deleted successfully.'], 200);
    }

    public function show($id)
    {
        $workshop = Workshop::with('category')->findOrFail($id);
        $categories = WorkshopCategory::all();
        return response()->json(['categories' => $categories, 'workshop' => $workshop]);
    }

    public function update(WorkshopSaveRequest $request, $id)
{
    Log::info('Received data for workshop update:', $request->all());
    $workshop = Workshop::findOrFail($id);
    $input = $request->validated();

    // Handle image upload
    if ($request->hasFile('images')) {
        // Delete old image
        if ($workshop->images) {
            Storage::delete('images/' . $workshop->images);
        }
        $extension = $request->images->extension();
        $filename = Str::random(6) . "-" . time() . "_workshop." . $extension;
        $request->images->storeAs('images', $filename);
        $input['images'] = $filename;
    } else {
        // If no new image is uploaded, remove images from input to prevent overwriting
        unset($input['images']);
    }

    // Update the workshop with the validated data
    $workshop->update($input);

    // Return a success response
    return response()->json([
        'message' => 'Workshop updated successfully.',
        'data' => $workshop
    ], 200);
}
}

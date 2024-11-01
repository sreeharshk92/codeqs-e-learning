<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseSaveRequest;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function save(CourseSaveRequest $request)
    {
        try {
            Log::info('Incoming request data:', $request->all());
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $extension = $request->image->extension();
                $filename = Str::random(6) . '-' . time() . '_course.' . $extension;
                $request->image->storeAs('images', $filename);
                $validated['image'] = $filename;
            }

            // Convert JSON-compatible fields
            $validated['learning_outcomes'] = json_encode($validated['learning_outcomes']);
            $validated['videos'] = json_encode($validated['videos']);

            Course::create($validated);
            return response()->json(['message' => 'Course saved successfully.'], 201);
        } catch (\Exception $e) {
            Log::error('Course save error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save course'], 500);
        }
    }

    public function list()
    {
        $courses = Course::with('category')->latest()->paginate(15);
        return response()->json($courses);
    }

    public function delete($id)
    {
        try {
            $course = Course::findOrFail($id);

            if ($course->image) {
                Storage::delete('images/' . $course->image);
            }

            $course->delete();
            return response()->json(['message' => 'Course deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete course'], 500);
        }
    }

    public function show($id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->image = $course->image ? url('storage/images/' . $course->image) : null;
            $course->learning_outcomes = json_decode($course->learning_outcomes, true);
            $course->videos = json_decode($course->videos, true);

            $categories = Category::all();

            return response()->json([
                'course' => $course,
                'categories' => $categories,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Course not found'], 404);
        }
    }

    public function update(CourseSaveRequest $request, $id)
    {
        try {
            Log::info('Incoming update request data:', $request->all());

            $validated = $request->validated();

            $course = Course::findOrFail($id);

            if ($request->hasFile('image')) {
                if ($course->image) {
                    Storage::delete('images/' . $course->image);
                }
                $filename = Str::random(6) . "-" . time() . "_course." . $request->image->extension();
                $request->image->storeAs('images', $filename);
                $validated['image'] = $filename;
            }

            $validated['learning_outcomes'] = json_encode($validated['learning_outcomes']);
            $validated['videos'] = json_encode($validated['videos']);

            $course->update($validated);

            return response()->json(['message' => 'Course updated successfully'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . $e->getMessage());
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Course update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update course'], 500);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseSaveRequest;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function save(CourseSaveRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $filename = Str::random(6) . '-' . time() . '_course.' . $request->image->extension();
                $request->image->storeAs('images', $filename);
                $validated['image'] = $filename;
            }

            if ($request->hasFile('videos')) {
                $videoPaths = [];
                foreach ($request->file('videos') as $video) {
                    $videoName = Str::random(6) . '-' . time() . '_video.' . $video->extension();
                    $video->storeAs('videos', $videoName);
                    $videoPaths[] = $videoName;
                }
                $validated['videos'] = json_encode($videoPaths);
            }

            $validated['learning_outcomes'] = json_encode($validated['learning_outcomes']);

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
            if ($course->image) Storage::delete('images/' . $course->image);
            if ($course->videos) {
                foreach (json_decode($course->videos, true) as $video) {
                    Storage::delete('videos/' . $video);
                }
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
        $course->learning_outcomes = json_decode($course->learning_outcomes, true);
        $course->videos = json_decode($course->videos) ?? []; // Ensure it's an array
        return response()->json([
            'course' => $course,
            'categories' => Category::all(),
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Course not found'], 404);
    }
}

    public function update(CourseSaveRequest $request, $id)
    {
        try {
            $course = Course::findOrFail($id);
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($course->image) Storage::delete('images/' . $course->image);
                $filename = Str::random(6) . '-' . time() . '_course.' . $request->image->extension();
                $request->image->storeAs('images', $filename);
                $validated['image'] = $filename;
            }

            if ($request->hasFile('videos')) {
                if ($course->videos) {
                    foreach (json_decode($course->videos, true) as $video) {
                        Storage::delete('videos/' . $video);
                    }
                }
                $videoPaths = [];
                foreach ($request->file('videos') as $video) {
                    $videoName = Str::random(6) . '-' . time() . '_video.' . $video->extension();
                    $video->storeAs('videos', $videoName);
                    $videoPaths[] = $videoName;
                }
                $validated['videos'] = json_encode($videoPaths);
            }

            $validated['learning_outcomes'] = json_encode($validated['learning_outcomes']);

            $course->update($validated);
            return response()->json(['message' => 'Course updated successfully.'], 200);
        } catch (\Exception $e) {
            Log::error('Course update error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update course'], 500);
        }
    }
    
}

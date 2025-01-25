<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WorkshopVideosSaveRequest;
use App\Models\Workshop;
use App\Models\WorkshopVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WorkshopVideosController extends Controller
{
    public function store(WorkshopVideosSaveRequest $request)
    {
        try {
            $input = $request->validated();

            // Handle video file upload
            if ($request->hasFile('videos')) {
                $file = $request->file('videos');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('workshop-videos', $filename, 'public');
                $input['videos'] = $path;
            }

            // Handle banner file upload
            if ($request->hasFile('banner')) {
                $extension = $request->banner->extension();
                $filename = Str::random(6) . "-" . time() . "_banner." . $extension;
                $request->banner->storeAs('banners', $filename, 'public'); // Ensure the directory is correct
                $input['banner'] = $filename;
            }

            // Create the WorkshopVideo record
            $workshopVideo = WorkshopVideo::create($input);

            return response()->json([
                'message' => 'Workshop video created successfully.',
                'data' => $workshopVideo
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error saving workshop video: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error saving workshop video: ' . $e->getMessage()
            ], 500);
        }
    }

    public function list()
    {
        $workshopvideo = WorkshopVideo::with('workshop')->paginate(10);
        return response()->json($workshopvideo);
    }

    public function delete($id)
    {
        $workshopvideo = WorkshopVideo::findOrFail($id);

        if ($workshopvideo->videos) {
            // Delete the file from storage
            Storage::disk('public')->delete($workshopvideo->videos);
        }

        $workshopvideo->delete();
        return response()->json(['message' => 'Workshop deleted successfully.'], 200);
    }

    public function show($id)
    {
        $workshopvideo = WorkshopVideo::with('workshop')->findOrFail($id);
        $workshop = Workshop::all();
        return response()->json(['workshop' => $workshop, 'workshopvideo' => $workshopvideo]);
    }

    public function update(WorkshopVideosSaveRequest $request, $id) {
        Log::info('Received data for workshop update:', $request->all());
        $workshopvideo = WorkshopVideo::findOrFail($id);
        $input = $request->validated();

        if ($request->hasFile('videos')) {
            // Delete old video
            if ($workshopvideo->videos) {
                Storage::disk('public')->delete($workshopvideo->videos);
            }

            // Store new video
            $file = $request->file('videos');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('workshop-videos', $filename, 'public');
            $input['videos'] = $path;
        } else {
            unset($input['videos']);
        }

        if ($request->hasFile('banner')) {
            if ($workshopvideo->banner) {
                Storage::disk('public')->delete($workshopvideo->banner);
            }

            $extension = $request->banner->extension();
            $filename = Str::random(6) . "-" . time() . "_banner." . $extension;
            $request->banner->storeAs('banners', $filename, 'public'); // Ensure the directory is correct
            $input['banner'] = $filename;
         } else {
            unset($input['banner']);
        }

        $workshopvideo->update($input);

        return response()->json([
            'message' => 'Workshop updated successfully.',
            'data' => $workshopvideo
        ], 200);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseSaveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'status' => 'boolean',
            'is_favourite' => 'boolean',
            'description' => 'nullable|string',
            'mentor' => 'nullable|string|max:255',
            'certificates' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5',
            'total_hours' => 'nullable|integer|min:0',
            'short_description' => 'nullable|string|max:500',
            'learning_outcomes' => 'nullable|array',
            'learning_outcomes.*' => 'string',
            'zoom_link' => 'nullable|url',
            'videos' => 'nullable|array',
            'videos.*' => 'file|mimes:mp4,mov,avi,mkv|max:10240',
            'duration_in_hours' => 'nullable|integer|min:0',
        ];
    }
}

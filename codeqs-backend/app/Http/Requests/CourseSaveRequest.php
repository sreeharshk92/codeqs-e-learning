<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Update to 'true' to allow request authorization
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB for image
            'status' => 'boolean',
            'is_favourite' => 'boolean',
            'description' => 'nullable|string',
            'mentor' => 'nullable|string|max:255',
            'certificates' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric|min:0|max:5', // Assuming rating is on a 5-point scale
            'total_hours' => 'nullable|integer|min:0',
            'short_description' => 'nullable|string|max:500',
            'learning_outcomes' => 'nullable|array', // Expecting JSON array
            'learning_outcomes.*' => 'string', // Each outcome as string
            'zoom_link' => 'nullable|url', // Valid URL format
            'videos' => 'nullable|array', // Expecting JSON array for multiple videos
            'videos.*' => 'url', // Each video URL should be valid
        ];
    }
}

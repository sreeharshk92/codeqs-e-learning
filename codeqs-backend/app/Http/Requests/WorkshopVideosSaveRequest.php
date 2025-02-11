<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkshopVideosSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust as necessary for authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdateRequest = $this->isMethod('PUT') || $this->isMethod('PATCH');

        $rules = [
            'workshop_id' => 'required|exists:workshops,id',
            'topic' => 'required|string|max:100',
            'duration' => 'required|integer|min:1',
            'description' => 'nullable|string',

            // Validation for Google Meet details
            'google_meet_link' => 'nullable|url', // Ensure it's a valid URL
            'google_meet_topic' => 'nullable|string|max:100', // Optional topic with max length 100
            'google_meet_scheduled_at' => 'nullable|date|after:now', // Scheduled time must be in the future
        ];

        // Conditional rules for video and banner files
        if ($isUpdateRequest) {
            $rules['videos'] = 'nullable|file'; // Allow updating without requiring a new file
            $rules['banner'] = 'nullable|image'; // Allow updating without requiring a new image
        } else {
            $rules['videos'] = 'required|file'; // Require a video file for creation
            $rules['banner'] = 'required|image'; // Require a banner image for creation
        }

        return $rules;
    }
    public function messages(): array
    {
        return [
            'workshop_id.required' => 'The workshop category is required.',
            'workshop_id.exists' => 'The selected workshop category does not exist.',

            'topic.required' => 'The topic field is required.',
            'topic.string' => 'The topic must be a valid string.',
            'topic.max' => 'The topic must not exceed 100 characters.',

            'duration.required' => 'The duration field is required.',
            'duration.integer' => 'The duration must be a valid number.',
            'duration.min' => 'The duration must be at least 1 second.',

            'description.string' => 'The description must be a valid string.',

            'google_meet_link.url' => 'The Google Meet link must be a valid URL.',

            'google_meet_topic.string' => 'The Google Meet topic must be a valid string.',
            'google_meet_topic.max' => 'The Google Meet topic must not exceed 100 characters.',

            'google_meet_scheduled_at.date' => 'The Google Meet scheduled time must be a valid date.',
            'google_meet_scheduled_at.after' => 'The Google Meet scheduled time must be a future date.',

            'videos.required' => 'The video file is required.',
            'videos.file' => 'The video must be a valid file.',

            'banner.required' => 'The banner image is required.',
            'banner.image' => 'The banner must be a valid image file.',
        ];
    }
}

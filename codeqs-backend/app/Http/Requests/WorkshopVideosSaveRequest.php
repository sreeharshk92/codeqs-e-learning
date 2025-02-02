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

        ];

        if ($isUpdateRequest) {
            $rules['videos'] = 'nullable|file';
            $rules['banner'] = 'nullable|image';
        } else {
            $rules['videos'] = 'required|file';
            $rules['banner'] = 'required|image';
        }

        return $rules;
    }

}

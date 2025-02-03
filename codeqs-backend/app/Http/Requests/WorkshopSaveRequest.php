<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WorkshopSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0|nullable',
            'discount' => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:workshop_categories,id',
            'seat_available' => 'required|integer|min:0',
            'subscribe'=>'required'
        ];

        // Add image validation based on request type
        if ($isUpdateRequest) {
            $rules['images'] = 'nullable|image';
        } else {
            $rules['images'] = 'required|image';
        }

        return $rules;
    }


}

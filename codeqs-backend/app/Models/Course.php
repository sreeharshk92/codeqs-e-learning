<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    // Specify the table if it's not the plural of the model name
    protected $table = 'courses';

    // Define the fillable properties to allow mass assignment
    protected $fillable = [
        'name', 'price', 'category_id', 'image', 'status', 'is_favourite',
        'description', 'mentor', 'certificates', 'rating', 'total_hours',
        'short_description', 'learning_outcomes', 'zoom_link', 'videos'
    ];
    // Define the relationship with the Category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $fillable = [
        'name', 'price', 'category_id', 'image', 'status', 'is_favourite',
        'description', 'mentor', 'certificates', 'rating', 'total_hours',
        'short_description', 'learning_outcomes', 'zoom_link', 'videos',
        'duration_in_hours' // Add the new field here
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function payment()
    {
        return $this->hasMany(Payment::class);
    }


}

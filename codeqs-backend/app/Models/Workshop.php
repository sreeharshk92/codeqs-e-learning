<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'discount',
        'category_id',
        'images',
        'seat_available',
    ];

    public function category()
    {
        return $this->belongsTo(WorkshopCategory::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function promotions()
    {
        return $this->hasMany(WorkshopPromotion::class);
    }

    public function wishlists()
    {
        return $this->hasMany(WorkshopWishlist::class);
    }
    public function workshopvideo()
    {
        return $this->hasMany(WorkshopVideo::class);
    }
}

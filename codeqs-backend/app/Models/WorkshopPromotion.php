<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopPromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'workshop_id',
        'discount_code',
        'start_date',
        'end_date',
    ];

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'payment_id',
        'status',
        'amount',
        'name',
        'email',
        'phone',
        'course_name',
    ];

    public function course(){
        return $this->belongsTo(Course::class);
    }
}

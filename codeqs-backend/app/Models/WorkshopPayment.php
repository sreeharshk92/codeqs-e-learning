<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkshopPayment extends Model
{
    protected $fillable = [
        'workshop_id',
        'order_id',
        'payment_id',
        'user_id',
        'name',
        'email',
        'phone',
        'status',
        'amount'
    ];

    public function workshop()
{
    return $this->belongsTo(Workshop::class, 'workshop_id');
}

public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}



}

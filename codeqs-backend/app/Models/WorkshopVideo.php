<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopVideo extends Model
{
    use HasFactory;

    protected $table = 'workshop_videos'; // Specify the table name if it's not plural of the model

    protected $primaryKey = 'video_id'; // Specify the primary key if it's not 'id'

    protected $fillable = [
        'workshop_id',
        'topic',
        'videos',
        'duration',
        'description',
        'banner',
    ];

    public function workshop()
    {
        return $this->belongsTo(Workshop::class, 'workshop_id');
    }
}

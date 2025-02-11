<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopVideo extends Model
{
    use HasFactory;

    /**
     * Specify the table name if it's not the plural of the model name.
     */
    protected $table = 'workshop_videos';

    /**
     * Specify the primary key if it's not 'id'.
     */
    protected $primaryKey = 'video_id';

    /**
     * Define the attributes that are mass assignable.
     */
    protected $fillable = [
        'workshop_id',
        'topic',
        'videos', // Path to the video file
        'duration',
        'description',
        'banner', // Path to the banner image
        'google_meet_link', // Google Meet link
        'google_meet_topic', // Google Meet topic
        'google_meet_scheduled_at', // Scheduled time for Google Meet session
    ];

    /**
     * Define the attributes that should be cast to native types.
     */
    protected $casts = [
        'google_meet_scheduled_at' => 'datetime', // Automatically cast to Carbon instance
    ];

    /**
     * Define the relationship with the Workshop model.
     */
    public function workshop()
    {
        return $this->belongsTo(Workshop::class, 'workshop_id');
    }

    /**
     * Accessor to format the Google Meet scheduled time in a user-friendly way.
     */
    public function getGoogleMeetScheduledAtAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format('Y-m-d H:i:s') : null;
    }

    /**
     * Mutator to ensure the Google Meet scheduled time is stored in the database as UTC.
     */
    public function setGoogleMeetScheduledAtAttribute($value)
    {
        $this->attributes['google_meet_scheduled_at'] = $value ? \Carbon\Carbon::parse($value)->toDateTimeString() : null;
    }
}

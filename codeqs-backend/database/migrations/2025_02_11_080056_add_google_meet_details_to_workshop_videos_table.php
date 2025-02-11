<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('workshop_videos', function (Blueprint $table) {
            // Add a column for the Google Meet link
            $table->string('google_meet_link')->nullable();

            // Add a column for the topic of the Google Meet session
            $table->string('google_meet_topic', 100)->nullable();

            // Add a column for the scheduled time to join the Google Meet session
            $table->timestamp('google_meet_scheduled_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_videos', function (Blueprint $table) {
            // Drop the added columns if rolling back the migration
            $table->dropColumn('google_meet_link');
            $table->dropColumn('google_meet_topic');
            $table->dropColumn('google_meet_scheduled_at');
        });
    }
};

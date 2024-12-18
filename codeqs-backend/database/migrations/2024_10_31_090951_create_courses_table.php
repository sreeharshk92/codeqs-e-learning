<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('price', 15, 2);
            $table->unsignedBigInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->string('image')->nullable();
            $table->boolean('status')->comment('1: Active, 0: Inactive')->default(1);
            $table->boolean('is_favourite')->comment('1: Yes, 0: No')->default(0);

            // New columns
            $table->text('description')->nullable();
            $table->string('mentor')->nullable();
            $table->string('certificates')->nullable();
            $table->float('rating', 8, 2)->nullable();
            $table->integer('total_hours')->nullable();
            $table->text('short_description')->nullable();
            $table->json('learning_outcomes')->nullable();

            // New columns for Zoom link and videos
            $table->string('zoom_link')->nullable();
            $table->json('videos')->nullable(); // Changed to JSON for array storage

            // New column for duration in hours
            $table->integer('duration_in_hours')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
        Schema::dropIfExists('categories');
    }
};

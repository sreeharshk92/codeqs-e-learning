<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            Course::create([
                'name' => $faker->sentence(3),
                'price' => $faker->randomFloat(2, 50, 500),
                'category_id' => $faker->numberBetween(1, 5),
                'image' => 'default-image.png', // Or replace with any default image name
                'status' => $faker->boolean(),
                'is_favourite' => $faker->boolean(),
                'description' => $faker->paragraph(),
                'mentor' => $faker->name(),
                'certificates' => $faker->word(),
                'rating' => $faker->randomFloat(1, 1, 5),
                'total_hours' => $faker->numberBetween(10, 100),
                'short_description' => $faker->sentence(),
                'learning_outcomes' => json_encode([$faker->sentence(), $faker->sentence()]),
                'zoom_link' => $faker->url(),
                'videos' => json_encode(['video1.mp4', 'video2.mp4']), // Adjust as needed
            ]);
        }
    }
}

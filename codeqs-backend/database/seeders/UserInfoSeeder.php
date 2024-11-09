<?php

namespace Database\Seeders;

use App\Models\Userinfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Userinfo::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'education' => 'Bachelor of Science',
            'occupation' => 'Software Developer',
        ]);
    }
}

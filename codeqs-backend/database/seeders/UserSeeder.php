<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'name' => 'malu',
            'email' => 'malu@gmail.com',
            'password' => Hash::make('malu123'), // Replace with a secure password
            'role' => 'admin', // Setting the role as admin
        ]);
    }
}

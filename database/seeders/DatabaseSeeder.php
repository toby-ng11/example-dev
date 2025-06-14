<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\Views\P21User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(10)->create();
        P21User::factory(20)->create();
        //Project::factory(10)->create();
    }
}

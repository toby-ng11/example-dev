<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Architect;
use App\Models\ArchitectType;
use App\Models\MarketSegment;
use App\Models\Project;
use App\Models\Status;
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
        //P21User::factory(20)->create();
        //Status::factory(5)->create();
        //MarketSegment::factory(5)->create();
        //Project::factory(10)->create();
        $this->call([
            ProjectSeeder::class,
        ]);
    }
}

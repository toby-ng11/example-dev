<?php

namespace Database\Seeders;

use App\Models\MarketSegment;
use App\Models\Project;
use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::factory()->count(5)->create();
        MarketSegment::factory()->count(5)->create();
        Project::factory()->count(10)->create();
    }
}

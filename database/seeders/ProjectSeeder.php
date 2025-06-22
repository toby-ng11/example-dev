<?php

namespace Database\Seeders;

use App\Models\Architect;
use App\Models\MarketSegment;
use App\Models\Project;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed some required statuses and segments first
        // Predefined Statuses
        $statuses = ['active', 'inactive', 'pending', 'completed', 'archived'];

        foreach ($statuses as $status) {
            Status::firstOrCreate(
                ['status_desc' => $status],
                ['project_flag' => 'Y', 'quote_flag' => 'N'] // or randomized if needed
            );
        }

        // Predefined Market Segments
        $segments = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Mixed Use'];

        foreach ($segments as $segment) {
            MarketSegment::firstOrCreate([
                'market_segment_desc' => $segment,
            ]);
        }

        // Create some users, architects, and specifiers
        User::factory()->count(10)->create();

        Architect::factory()
            ->count(5)
            ->withSpecifiers(5) // add this method if not already
            ->create();

        // Finally, create projects
        Project::factory()->count(10)->create();
    }
}

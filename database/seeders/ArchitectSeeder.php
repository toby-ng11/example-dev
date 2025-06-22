<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Architect;
use App\Models\Specifier;
use App\Models\ArchitectType;

class ArchitectSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Seed predefined ArchitectTypes (once)
        $types = [
            'Residential',
            'Commercial',
            'Industrial',
            'Landscape',
            'Interior Design',
            'Urban Planning',
        ];

        foreach ($types as $type) {
            ArchitectType::firstOrCreate(['architect_type_desc' => $type]);
        }

        for ($i = 0; $i < 5; $i++) {
            $user = User::factory()->create();
            $architectType = ArchitectType::inRandomOrder()->first();

            $architect = Architect::factory()->create([
                'architect_rep_id' => $user->username,
                'architect_type_id' => $architectType->id,
            ]);

            // Step 3: Create 2–4 Specifiers for each Architect
            $specifierCount = rand(2, 4);

            Specifier::factory()
                ->count($specifierCount)
                ->state(['architect_id' => $architect->id])
                ->create();
        }
    }
}

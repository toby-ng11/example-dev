<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\ArchitectType;
use App\Models\Specifier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Architect>
 */
class ArchitectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'architect_name' => $this->faker->company(),
            'architect_rep_id' => User::inRandomOrder()->first()->username ?? User::factory()->create()->username,
            'company_id' => 'TOR',
            'architect_type_id' => ArchitectType::inRandomOrder()->first()?->id ?? ArchitectType::factory()->create()->id,
            'class_id' => $this->faker->randomLetter(),
        ];
    }

    public function configure(int $count = 3)
    {
        return $this->afterCreating(function ($architect) use ($count) {
            Address::factory()->count($count)->forArchitect($architect)->create();
        });
    }

    public function withSpecifiers(int $count = 3)
    {
        return $this->afterCreating(function ($architect) use ($count) {
            Specifier::factory()
                ->count($count)
                ->state(['architect_id' => $architect->id])
                ->create();
        });
    }
}

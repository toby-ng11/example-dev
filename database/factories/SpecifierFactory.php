<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Architect;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specifier>
 */
class SpecifierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'job_title' => $this->faker->jobTitle(),
            'architect_id' => Architect::inRandomOrder()->first()?->id ?? Architect::factory(), // fallback
            'address_id' => null,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($specifier) {
            $address = Address::factory()->forSpecifier($specifier)->create();
            $specifier->update(['address_id' => $address->id]);
        });
    }
}

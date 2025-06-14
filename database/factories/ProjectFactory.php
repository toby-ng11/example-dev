<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'project_id_ext' => $this->faker->uuid(),
        'project_name' => $this ->faker->company(),
        'project_address' => $this->faker->address(),
        'centura_location_id' => $this->faker->numberBetween(101, 113),
        'owner_id' => $this->faker->userName(),
        'shared_id' => $this->faker->userName(),
        'status_id' => $this->faker->numberBetween(0, 5),
        'reed' => $this->faker->word(),
        'market_segment_id'  => $this->faker->numberBetween(0, 5),
        'specifier_id' => $this->faker->randomDigitNotNull(),
        'general_contractor_id' => $this->faker->numberBetween(100000, 999999),
        'awarded_contractor_id' => $this->faker->numberBetween(100000, 999999),
        'require_date' => $this->faker->dateTimeThisYear(),
        'due_date' => $this->faker->dateTimeThisYear(),
        'last_maintained_by' => $this->faker->username(),
        'architect_id' => $this->faker->randomDigitNotNull(),
        'architect_address_id'  => $this->faker->randomDigitNotNull(),
        ];
    }
}

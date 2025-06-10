<?php

namespace Database\Factories;

use App\Models\MarketSegment;
use App\Models\P21LocationxBranch;
use App\Models\Status;
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
            'project_name' => $this->faker->company(),
            'project_address' => $this->faker->address(),
            'centura_location_id' => P21LocationxBranch::inRandomOrder()->whereBetween('location_id', [101, 113])->value('location_id') ?? 101,
            'owner_id' => fake()->unique()->userName(),
            'shared_id' => fake()->unique()->userName(),
            'status_id' => Status::inRandomOrder()->value('status_id'),
            'reed' => $this->faker->word(),
            'market_segment_id' => MarketSegment::inRandomOrder()->value('market_segment_id'),
            'specifier_id' => $this->faker->randomDigitNotNull(),
            'general_contractor_id' => $this->faker->numberBetween(100000, 999999),
            'awarded_contractor_id' => $this->faker->numberBetween(100000, 999999),
            'require_date' => $this->faker->dateTimeThisYear(),
            'due_date' => $this->faker->dateTimeThisYear(),
            'last_maintained_by' => $this->faker->name(),
            'delete_flag' => $this->faker->randomElement(['Y', 'N']),
            'architect_id' => $this->faker->randomDigitNotNull(),
            'architect_address_id' => $this->faker->randomDigitNotNull(),
        ];
    }
}

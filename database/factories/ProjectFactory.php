<?php

namespace Database\Factories;

use App\Models\Architect;
use App\Models\MarketSegment;
use App\Models\Specifier;
use App\Models\Status;
use App\Models\User;
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
        $status = Status::inRandomOrder()->first() ?? Status::factory()->create();
        $marketSegment = MarketSegment::inRandomOrder()->first() ?? MarketSegment::factory()->create();
        $owner = User::inRandomOrder()->first() ?? User::factory()->create();
        $shared = User::inRandomOrder()->first() ?? User::factory()->create();

        $architect = Architect::inRandomOrder()->first() ?? Architect::factory()->create();
        $specifier = Specifier::where('architect_id', $architect->id)->inRandomOrder()->first();

        if (!$specifier) {
            $specifier = Specifier::factory()->create(['architect_id' => $architect->id]);
        }

        $address = $architect->addresses()->inRandomOrder()->first();

        return [
        'project_id_ext' => $this->faker->uuid(),
        'project_name' => $this ->faker->company() . ' Project',
        'project_address' => $this->faker->address(),
        'centura_location_id' => $this->faker->numberBetween(101, 113),
        'owner_id' => $owner->username,
        'shared_id' => $shared->username,
        'status_id' => $status->id,
        'reed' => $this->faker->word(),
        'market_segment_id'  => $marketSegment->id,
        'specifier_id' => $specifier->id,
        'general_contractor_id' => $this->faker->numberBetween(100000, 999999),
        'awarded_contractor_id' => $this->faker->numberBetween(100000, 999999),
        'require_date' => $this->faker->dateTimeBetween('-2 months', 'now'),
        'due_date' => $this->faker->dateTimeBetween('now', '+2 months'),
        'last_maintained_by' => $owner->username,
        'architect_id' => $architect->id,
        'architect_address_id'  => $address->id,
        ];
    }
}

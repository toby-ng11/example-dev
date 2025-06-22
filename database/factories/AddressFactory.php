<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'phys_address1' => $this->faker->streetAddress(),
            'phys_address2' => $this->faker->secondaryAddress(),
            'phys_city' => $this->faker->city(),
            'phys_state' => $this->faker->stateAbbr(),
            'phys_postal_code' => $this->faker->postcode(),
            'phys_country' => $this->faker->country(),
            'central_phone_number' => $this->faker->phoneNumber(),
            'email_address' => $this->faker->companyEmail(),
            'url' => $this->faker->url(),
            'addressable_id' => null, // set manually
            'addressable_type' => null, // set manually
        ];
    }

    /**
     * Attach to an architect
     */
    public function forArchitect($architect)
    {
        return $this->state([
            'addressable_id' => $architect->id,
            'addressable_type' => get_class($architect),
        ]);
    }

    /**
     * Attach to a specifier
     */
    public function forSpecifier($specifier)
    {
        return $this->state([
            'addressable_id' => $specifier->id,
            'addressable_type' => get_class($specifier),
        ]);
    }
}

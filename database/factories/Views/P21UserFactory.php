<?php

namespace Database\Factories\Views;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Views\P21User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Views\P21User>
 */
class P21UserFactory extends Factory
{
    protected $model = P21User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstName = $this->faker->firstName();
        $lastName = $this->faker->lastName();

        $defaultCompany = 'TOR';
        $branch = '01';

        $roleNames = ['IT', 'Operation Manager', 'Order Desk', 'Sales', 'Support'];
        $roleName = $this->faker->randomElement($roleNames);

        return [
            'id' => strtoupper(substr($firstName, 0, 1) . $lastName),
            'name' => "$firstName $lastName",
            'default_company' => $defaultCompany,
            'default_location_id' => 101,
            'default_branch' => $branch,
            'role_uid' => $this->faker->randomNumber(3, true),
            'email_address' => strtolower(substr($firstName, 0, 1)) . $lastName . "@example.com",
            'role' => "$defaultCompany - $roleName",
            'branch_description' => 'Main Branch',
            'first_name' => $firstName,
            'last_name' => $lastName,
            'p2q_system_role' => $this->faker->randomElement(['admin', 'user', 'manager']),
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => $name = 'Roronoa Zoro',
            'username' => usernameGenerator($name),
            'email' => 'admin@gmail.com',
        ])->assignRole(Role::create(['name' => 'admin']));

        User::factory()->create([
            'name' => $name = 'Nami',
            'username' => usernameGenerator($name),
            'email' => 'testing1@gmail.com',
        ])->assignRole(Role::create(['name' => 'operator']));

        User::factory()->create([
            'name' => $name = 'Robin',
            'username' => usernameGenerator($name),
            'email' => 'testing2@gmail.com',
        ])->assignRole(Role::create(['name' => 'member']));
        $this->call(CategorySeeder::class);
        $this->call(PublisherSeeder::class);
    }
}

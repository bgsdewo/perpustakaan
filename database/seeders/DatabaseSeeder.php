<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Rorona Zoro',
            'username' => 'Zoro',
            'email' => 'zoro@cendekia.test',
        ]);
        $this->call(CategorySeeder::class);
        $this->call(PublisherSeeder::class);
    }
}

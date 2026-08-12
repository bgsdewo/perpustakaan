<?php

namespace App\Http\Resources;

use Carbon\Carbon; // <--- Jangan lupa import Carbon untuk format tanggal
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'role' => $this->getRoleNames(),

            // TAMBAHKAN BARIS DI BAWAH INI:
            'phone' => $this->phone,
            'gender' => $this->gender,
            'date_of_birth' => $this->date_of_birth ? Carbon::parse($this->date_of_birth)->format('Y-m-d') : null,
            'address' => $this->address,

            'roles' => $this->getRoleNames(),
        'permissions' => $this->getAllPermissions()->pluck('name'),
        ];
    }
}

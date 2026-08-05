<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon; // <--- Pastikan import Carbon ada di sini
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'gender' => $this->gender,
           'date_of_birth' => $this->date_of_birth ? Carbon::parse($this->date_of_birth)->format('Y-m-d') : null, // <--- Ubah ke format Y-m-d
            'address' => $this->address,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
